import React from 'react';

export default function SeniorIdCard({ senior, qrCodeUrl, previewMode = false }) {
    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
            {/* ID Card Header */}
            <div className="bg-blue-600 text-white text-center py-2 font-bold">
                <h3 className="text-sm">REPUBLIC OF THE PHILIPPINES</h3>
                <h2 className="text-lg">SENIOR CITIZEN ID CARD</h2>
            </div>
            
            <div className="flex p-4">
                {/* Left side with photo */}
                <div className="w-1/3 flex flex-col items-center gap-2">
                    <div className="bg-gray-200 w-24 h-24 flex items-center justify-center overflow-hidden rounded-md">
                        {senior.photo_path ? (
                            <img 
                                src={`/storage/${senior.photo_path}`} 
                                alt="Senior Photo" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-500 text-xs text-center">No Photo Available</span>
                        )}
                    </div>
                    
                    {qrCodeUrl && (
                        <div className="w-24 h-24">
                            <img 
                                src={qrCodeUrl} 
                                alt="QR Code" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>
                
                {/* Right side with details */}
                <div className="w-2/3 pl-4">
                    <div className="mb-2">
                        <p className="text-xs text-gray-500">Senior Citizen ID:</p>
                        <p className="font-semibold">{senior.senior_citizen_id}</p>
                    </div>
                    
                    <div className="mb-2">
                        <p className="text-xs text-gray-500">Full Name:</p>
                        <p className="font-semibold">
                            {senior.first_name} {senior.middle_name ? `${senior.middle_name.charAt(0)}. ` : ''}
                            {senior.last_name}{senior.suffix ? ` ${senior.suffix}` : ''}
                        </p>
                    </div>
                    
                    <div className="mb-2">
                        <p className="text-xs text-gray-500">Date of Birth:</p>
                        <p className="font-semibold">{new Date(senior.birth_date).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="mb-2">
                        <p className="text-xs text-gray-500">Address:</p>
                        <p className="font-semibold text-sm">
                            {senior.address}, Brgy. {senior.barangay}
                        </p>
                    </div>
                    
                    <div className="mb-2">
                        <p className="text-xs text-gray-500">In case of emergency:</p>
                        <p className="font-semibold text-sm">
                            {senior.emergency_contact_name || 'N/A'} - {senior.emergency_contact_number || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* ID Card Footer */}
            <div className="bg-blue-600 text-white text-center py-1 text-xs">
                <p>This card is non-transferable and must be presented upon request.</p>
                <p>If found, please return to the nearest OSCA office.</p>
            </div>
            
            {/* Watermark in preview mode */}
            {previewMode && (
                <div className="absolute inset-0 flex items-center justify-center opacity-20 rotate-45 text-6xl font-bold text-red-500">
                    PREVIEW
                </div>
            )}
        </div>
    );
}
