import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import getCurrentUser from '@/actions/auth/get-current-user-server.actions';

// Types for strongly typed request body
interface DayItinerary {
    brief: string;
    description: string;
}

interface PackageBody {
    title: string;
    description: string;
    imageSrc: string;
    theme: string;
    price: number;
    location: string;
    days: number;
    nights: number;
    rating: number;
    discount: number;
    pickup: string;
    drop: string;
    otherInfo: {
        info: Record<string, string>;
        disclaimer: string;
    };
    itinerary: Record<string, DayItinerary>;
}

export async function POST(request: Request) {
    try {
        // Authenticate user
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Parse request body
        const body: PackageBody = await request.json();

        // Validate required fields
        const requiredFields = [
            'title',
            'description',
            'imageSrc',
            'theme',
            'price',
            'location',
            'days',
            'rating',
            'pickup',
            'drop',
            'itinerary',
        ];

        const missingFields = requiredFields.filter((field) => !body[field as keyof PackageBody]);
        if (missingFields.length > 0) {
            return new NextResponse(`Missing required fields: ${missingFields.join(', ')}`, { status: 400 });
        }

        // Check if nights is missing but days is greater than 1
        if (body.days > 1 && (body.nights === undefined || body.nights === null)) {
            return new NextResponse('Nights field is required when days is greater than 1', { status: 400 });
        }

        // Validate numeric fields
        if (body.price <= 0) {
            return new NextResponse('Price must be greater than 0', { status: 400 });
        }
        if (body.days <= 0) {
            return new NextResponse('Days must be greater than 0', { status: 400 });
        }
        if (body.rating < 0 || body.rating > 5) {
            return new NextResponse('Rating must be between 0 and 5', { status: 400 });
        }
        if (body.discount < 0 || body.discount > 100) {
            return new NextResponse('Discount must be between 0 and 100', { status: 400 });
        }

        // Create package in database with type-safe data
        const packageData = {
            title: body.title,
            description: body.description,
            imageSrc: body.imageSrc,
            theme: body.theme,
            price: body.price,
            location: body.location,
            days: body.days,
            nights: body.nights, // This can now be zero without error
            rating: body.rating,
            discount: body.discount ?? 0,
            pickup: body.pickup,
            drop: body.drop,
            otherInfo: JSON.parse(JSON.stringify(body.otherInfo)), // Ensure proper JSON serialization
            itinerary: JSON.parse(JSON.stringify(body.itinerary)), // Ensure proper JSON serialization
            userId: currentUser.id,
        };

        const packagess = await prisma.packages.create({
            data: packageData,
        });

        return NextResponse.json(packagess);
    } catch (error) {
        console.error('[PACKAGE_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function GET() {
    try {
        const packages = await prisma.packages.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Parse JSON fields if needed
        const parsedPackages = packages.map((pkg) => ({
            ...pkg,
            otherInfo: typeof pkg.otherInfo === 'string' ? JSON.parse(pkg.otherInfo) : pkg.otherInfo,
            itinerary: typeof pkg.itinerary === 'string' ? JSON.parse(pkg.itinerary) : pkg.itinerary,
        }));

        return NextResponse.json(parsedPackages);
    } catch (error) {
        console.error('[PACKAGE_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
