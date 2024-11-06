import React from 'react';
import { IconType } from 'react-icons';

interface BulletPointsProps {
    icon: IconType;
    text: string;
    color?: string;
    size?: number;
};

const BulletPoints: React.FC<BulletPointsProps> = ({ icon: Icon, text, size, color }) => {
    return (
        <div className="mt-3 ml-7 flex gap-2">
            <div className="mt-[4px]">
                <Icon color={color || '#22C55E'} size={size || 16} />
            </div>
            <span className="">{ text }</span>
        </div>
    );
};

export default BulletPoints;
