'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { reliefCenters } from '@/data/reliefCenters';
import { MapPinHouse, ChevronLeft, ChevronRight, HousePlus, MonitorCog, Settings, EllipsisVertical, Map, MapPin } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import clsx from 'clsx';

const categories = [
    {
        key: 'control_room',
        label: 'Control Rooms',
        icon: <MonitorCog size={16} />,
    },
    {
        key: 'relief_godown',
        label: 'Relief Godowns',
        icon: <HousePlus size={16} />,
    },
    {
        key: 'relief_shelter',
        label: 'Relief Shelters',
        icon: <MapPinHouse size={16} />,
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
                    'flex flex-col items-center py-4 space-y-2 transition-all w-14',
                )}
            >
                <div className='mb-4'>
                    <img src="/img/main-logo.jpg" alt="" className='w-10' />
                </div>

                {categories.map((cat) => (
                    <Tooltip key={cat.key}>
                        <TooltipTrigger asChild>
                            <div
                                key={cat.key}
                                variant={active === cat.key ? 'default' : 'ghost'}
                                onClick={() => setActive(cat.key)}
                                className={clsx('p-2 border rounded', active === cat.key ? 'border-rose-600 bg-rose-600/10 text-rose-600' : 'border-transparent')}
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
            <div className="w-80 p-4 overflow-y-auto hidden md:block">
                <div className='w-full mb-4'>
                    <p className='text-rose-600 uppercase font-medium'><span className='font-bold'>BOEM</span> (Builder Office of Emergency Managment)</p>
                </div>

                <div className='p-4 rounded flex flex-col gap-4 bg-secondary'>
                    <div className='flex flex-col gap-4'>
                        <div className='w-full flex items-center justify-between'>
                            <h2 className="text-sm font-semibold">
                                {categories.find((c) => c.key === active)?.label}
                            </h2>
                            <EllipsisVertical size={16} />
                        </div>
                    </div>

                    <div className='w-full flex items-center gap-2 bg-rose-600/10 px-2 py-1 rounded'>
                        <MapPin fill='#F48FB1' className='text-rose-600 min-w-4' size={16} />
                        <input type='text' placeholder='Search places...' className='p-2 text-sm border-none outline-none bg-white max-w-full rounded' />
                    </div>

                    <div className="space-y-3">
                        {filtered.map((item) => (
                            <div
                                key={item.id}
                                className="p-2 rounded flex flex-col gap-2 bg-white border hover:border-rose-600 cursor-pointer transition-all"
                                onClick={() => onSelect?.(item)}
                            >
                                <div className="flex gap-2 items-center text-sm font-semibold">
                                    {item.type === 'control_room' ? <div className='min-w-8 flex items-center justify-center aspect-square rounded bg-rose-600/20'><MonitorCog size={16} className='text-rose-600' /></div> : item.type === 'relief_godown' ? <div className='min-w-8 flex items-center justify-center aspect-square rounded bg-rose-600/20'><HousePlus size={16} className='text-rose-600' /></div> : <div className='min-w-8 flex items-center justify-center aspect-square rounded bg-rose-600/20'><MapPinHouse size={16} className='text-rose-600' /></div>}
                                    {item.name}
                                </div>
                                <div className="text-sm font-medium text-muted-foreground">
                                    {item.phoneNumbers?.length
                                        ? `Phone: ${item.phoneNumbers.join(', ')}`
                                        : `Tehsil: ${item.tehsil}`}
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
