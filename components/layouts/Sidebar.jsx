'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { reliefCenters } from '@/data/reliefCenters';
import { MapPinHouse, Siren, Warehouse, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import clsx from 'clsx';

const categories = [
    {
        key: 'control_room',
        label: 'Control Rooms',
        icon: <Siren />,
        color: 'text-red-500 border-red-500',
    },
    {
        key: 'relief_godown',
        label: 'Relief Godowns',
        icon: <Warehouse />,
        color: 'text-yellow-500 border-yellow-500',
    },
    {
        key: 'relief_shelter',
        label: 'Relief Shelters',
        icon: <MapPinHouse />,
        color: 'text-green-500 border-green-500',
    },
];


export default function Sidebar({ onSelect }) {
    const [active, setActive] = useState('control_room');
    const [collapsed, setCollapsed] = useState(false);

    const filtered = reliefCenters.filter((item) => item.type === active);

    return (
        <div className="flex h-screen border-r shadow-lg bg-background">
            {/* Main Sidebar */}
            <div
                className={clsx(
                    'flex flex-col items-center py-4 space-y-4 border-r bg-muted transition-all',
                    collapsed ? 'w-14' : 'w-20'
                )}
            >
                {categories.map((cat) => (
                    <Tooltip key={cat.key}>
                        <TooltipTrigger asChild>
                            <div
                                key={cat.key}
                                variant={active === cat.key ? 'default' : 'ghost'}
                                onClick={() => setActive(cat.key)}
                                className={clsx('p-2', cat.color)}
                            >
                                {cat.icon}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">{cat.label}</TooltipContent>
                    </Tooltip>
                ))}
                <Button
                    variant="ghost"
                    className="mt-auto p-2"
                    onClick={() => setCollapsed((prev) => !prev)}
                >
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </Button>
            </div>

            {/* Subsidebar */}
            <div className="w-72 p-4 overflow-y-auto hidden md:block">
                <h2 className="text-xl font-bold mb-4">
                    {categories.find((c) => c.key === active)?.label}
                </h2>

                <div className="space-y-3">
                    {filtered.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 rounded-lg bg-white shadow-md hover:shadow-lg cursor-pointer transition-all"
                            onClick={() => onSelect?.(item)}
                        >
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                                {item.phoneNumbers?.length
                                    ? `Phone: ${item.phoneNumbers.join(', ')}`
                                    : `Tehsil: ${item.tehsil}`}
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}
