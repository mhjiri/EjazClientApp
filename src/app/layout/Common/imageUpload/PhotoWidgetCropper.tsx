import React from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface Props {
    imagePreview: string;
    setCropper: (cropper: Cropper) => void;
    height? : number
    aspectRatio? : number
}

export default function PhotoWidgetCropper({ imagePreview, setCropper, height, aspectRatio }: Props) {
    return (
        <Cropper
            src={imagePreview}
            style={{ height: height, width: '100%' }}
            initialAspectRatio={aspectRatio}
            aspectRatio={aspectRatio}
            preview='.img-preview'
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
        />
    )
}
