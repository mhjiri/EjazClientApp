import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import PhotoUploadWidgetDropzone from './PhotoWidgetDropzone';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import { toAbsoluteUrl } from '../../../../_ejaz/helpers';

interface Props {
    loading: boolean;
    uploaded: number;
    uploadPhoto: (file: Blob) => void;
    deletePhoto: () => void;
    src?: string
    height : number
    aspectRatio : number
}

export default observer(function PhotoUploadWidget({ loading, uploaded, uploadPhoto, deletePhoto, src, height, aspectRatio }: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    const [deleted, setDeleted] = useState<number>(0);
    

    function onCrop(event:any) {
        event.preventDefault()
        if (cropper) {
            setDeleted(0)
            cropper.getCroppedCanvas().toBlob(blob =>  { 
                uploadPhoto(blob!);
            })
            
        }
    }

    function onDelete(event:any) {
        event.preventDefault()
        setDeleted(1)
        deletePhoto()
    }

    function onCancel() {
        setFiles([]);
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
        
    }, [files]);

    useEffect(() => {
        if(uploaded==1) setFiles([]);
    }, [uploaded])

    useEffect(() => {
        
    }, [src])

    return (
        <>
            <div className='row mb-6'>
                <div className='col-lg-3'>
                    <div
                    className='image-input image-input-outline'
                    data-kt-image-input='true'
                    style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                    >
                    <div
                        className='image-input-wrapper w-125px'
                        style={{minHeight: height, overflow: 'hidden', backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                    >
                        {(files && files.length > 0) ? (
                            <div className='image-input-wrapper w-125px img-preview' style={{height:height}}></div>
                         ) : ((src && src !== '' && src.length > 100 && deleted == 0)) ? (
                            <img className='image-input-wrapper w-125px'  style={{height:height}} src={src}></img>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                    {files && files.length > 0  ? (
                        <>
                            <button onClick={onCancel} className='btn btn-light align-self-center'>
                                <i className="fas fa-close fs-4 "></i>
                            </button>
                            <button onClick={onCrop} className='btn btn-primary' disabled={loading}>
                                {!loading && <i className="fas fa-upload fs-4 "></i>}
                                {loading && (
                                <span className='indicator-progress' style={{display: 'block'}}>
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                                )}
                            </button>
                        </>
                    ) :
                    src && src !== '' && src.length > 100 && (
                        <>
                            <button onClick={onDelete} className='btn btn-light align-self-center w-125px'>
                                <i className="fas fa-close fs-4 "></i>
                            </button>
                        </>
                    )}
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div
                    className='image-input image-input-outline'
                    data-kt-image-input='true'
                    style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                    >
                        <div
                            className='image-input-wrapper w-125px'
                            style={{minHeight: height, overflow: 'hidden'}}
                        >
                            <PhotoUploadWidgetDropzone setFiles={setFiles} height={height} />
                            
                        </div>
                    </div>
                </div>
                <div className='col-lg-6'>
                    {files && files.length > 0 &&
                        <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} aspectRatio={aspectRatio} />
                    }
                </div>
                <div className='col-lg-3'>
                    
                </div>
            </div>
            
        </>
    )
})
