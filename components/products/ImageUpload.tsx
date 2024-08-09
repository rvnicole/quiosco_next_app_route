"use client"

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from 'react-icons/tb';
import Image from "next/image";
import { getImagePath } from "@/utils";

export default function ImageUpload({ image }: {image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState('');

    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if(result.event === 'success' && result.info ) {
                    widget.close();

                    // @ts-ignore
                    const url = result.info.secure_url;
                    setImageUrl(url);
                }
            }} 

            uploadPreset="n2xbdah9"
            options={{ maxFiles:1 }}
        >
            {
                ({ open }) => (
                    <>
                        <div className="space-y-2">
                            <label className="text-slate-800">Image Producto</label>

                            <div 
                                className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 rounded-lg"
                                onClick={() => open()}
                            >
                                <TbPhotoPlus 
                                    size={50}
                                    color="rgb(148 163 184)"
                                />

                                <p className="text-lg font-semibold text-slate-400">Agregar Imagen</p>

                                { imageUrl && (
                                        <>
                                            <div
                                                className="absolute inset-0 w-full h-full"
                                            >
                                                <Image 
                                                    fill
                                                    style={{objectFit: 'contain'}}
                                                    src={imageUrl}
                                                    alt='Imagen de Producto'
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                        { image && (
                                <div className="space-y-2">
                                    <label>Imagen Actual</label>
                                    <div className="relative w-64 h-64">
                                        <Image 
                                            fill
                                            src={getImagePath(image)}
                                            alt='Imagen de Producto'
                                        />
                                    </div>
                                </div>
                            )
                        }

                        <input 
                            type="hidden"
                            name="image"
                            value={imageUrl ? imageUrl : image}
                        />
                    </>
                )
            }
        </CldUploadWidget>
    )
}