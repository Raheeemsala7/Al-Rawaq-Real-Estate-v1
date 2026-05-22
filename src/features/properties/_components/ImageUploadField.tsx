"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X, UploadCloud } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";
import { CreatePropertyFormData } from "../types/property";
import { Button } from "@/shared/components/ui/button";
import { FieldError } from "@/shared/components/ui/field";

const MAX_IMAGES = 15;

interface UploadFileProps {
    form: UseFormReturn<CreatePropertyFormData>;
    previews: string[]
    setPreviews: (prev: string[]) => void
}

export function UploadFileField({ form, previews, setPreviews }: UploadFileProps) {
    // Dropzone handler
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const currentFiles = form.getValues("images") || [];
            if (currentFiles.length >= MAX_IMAGES) return;

            const filesToAdd = acceptedFiles.slice(0, MAX_IMAGES - currentFiles.length);
            const newFiles = [...currentFiles, ...filesToAdd];

            // تحديث الـ previews
            const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
            setPreviews(newPreviews);

            // تحديث الفورم
            form.setValue("images", newFiles, { shouldValidate: true });
        },
        [form]
    );

    // إزالة صورة
    const removeImage = (index: number) => {
        const currentFiles = form.getValues("images") || [];
        const newFiles = currentFiles.filter((_ : undefined, i : number) => i !== index);
        setPreviews(newFiles.map((file : File) => URL.createObjectURL(file)));
        form.setValue("images", newFiles, { shouldValidate: true });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: true,
    });

    return (

        <Controller
            name="images"
            control={form.control}
            render={({ field, fieldState }) => {
                return (
                    <>
                        <div className="space-y-4">
                            {/* Dropzone */}
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25 hover:border-primary/60"
                                    } ${previews.length >= MAX_IMAGES ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <input {...getInputProps()} disabled={previews.length >= MAX_IMAGES} />
                                <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
                                {isDragActive ? (
                                    <p className="text-sm text-primary">Drop your files here...</p>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        Drop files here or <span className="text-primary font-medium">click to upload</span>
                                    </p>
                                )}
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="mt-3"
                                    disabled={previews.length >= MAX_IMAGES}
                                >
                                    Select Files
                                </Button>
                            </div>

                            {/* Previews */}
                            {previews.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                    {previews.map((url, index) => (
                                        <div key={index} className="relative w-28 h-28 border rounded-md overflow-hidden group">
                                            <Image src={url} alt={`Uploaded ${index + 1}`} fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-100 transition"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {
                            fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )
                        }
                    </>

                )
            }}
        />
    );
}
