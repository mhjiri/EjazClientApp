import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import AudioUploadWidgetDropzone from './AudioWidgetDropzone';
import { toAbsoluteUrl } from '../../../../_ejaz/helpers';

interface Props {
    loading: boolean;
    uploaded: number;
    text: string;
    uploadAudio: (file: Blob) => void;
    deleteAudio: () => void;
    src?: string
    initialSrc?: string
    height : number
    aspectRatio : number
}

export default observer(function AudioUploadWidget({ loading, uploaded, text, uploadAudio, deleteAudio, src, initialSrc, height, aspectRatio }: Props) {
    const [files, setFiles] = useState<any>([]);
    const [deleted, setDeleted] = useState<number>(0);

    function onUpload(event:any) {
        event.preventDefault()
        setDeleted(0)
        uploadAudio(files[0]);
    }

    function onCancel() {
        setFiles([]);
    }


    function onDelete(event:any) {
        event.preventDefault()
        setDeleted(1)
        deleteAudio()
    }
    

    // useEffect(() => {
    //     return () => {
    //         files.forEach((file: any) => URL.revokeObjectURL(file.preview))
    //     }
        
    // }, [files]);

    useEffect(() => {
        if(uploaded==1) setFiles([]);
    }, [uploaded])

    useEffect(() => {
        
    }, [src])

    return (
        <>
            <div className='row mb-6'>
                <div className='col-lg-6'>
                    <div
                    className='image-input image-input-outline'
                    data-kt-image-input='true'
                    style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                    >
                    <div
                    className='image-input image-input-outline'
                    data-kt-image-input='true'
                    style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                    >
                        <div
                            className='image-input-wrapper w-250px'
                            style={{minHeight: height, overflow: 'hidden'}}
                        >
                            <AudioUploadWidgetDropzone setFiles={setFiles} height={height} text={text} />
                            
                        </div>
                    </div>
                    {files && files.length > 0  && (
                        <div className='w-250px'>
                            <button onClick={onCancel} className='btn btn-light align-self-center w-125px'>
                                <i className="fas fa-close fs-4 "></i>
                            </button>
                            <button onClick={onUpload} className='btn btn-primary w-125px' disabled={loading}>
                                {!loading && <i className="fas fa-upload fs-4 "></i>}
                                {loading && (
                                <span className='indicator-progress' style={{display: 'block'}}>
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                                )}
                            </button>
                        </div>
                    )}
                    {deleted == 0 && uploaded == 1 && src != '' && (
                    <>
                        {/* <audio className='w-250px' controlsList="nodownload" controls preload="auto" src={`http://localhost:5000/ejaz/v1/Medium/getImage/${src}`} ></audio> */}
                        {/* <audio className='w-250px' controlsList="nodownload" controls preload="auto" src={`https://ejaz.azurewebsites.net/ejaz/v1/Medium/getImage/${src}`} ></audio> */}
                        <audio className='w-250px' controlsList="nodownload" controls preload="auto" src={`https://ejazapi.azurewebsites.net/ejaz/v1/Medium/getImage/${src}`} ></audio>
                        <button onClick={onDelete} className='btn btn-light align-self-center w-250px'>
                            <i className="fas fa-close fs-4 "></i>
                        </button>
                    </>
                    )}
                    {deleted == 0 && uploaded != 1 && initialSrc !='' && initialSrc != null && (
                        <>
                            {/* <audio className='w-250px' controlsList="nodownload" controls preload="auto" src={`http://localhost:5000/ejaz/v1/Medium/getImage/${initialSrc}`} ></audio> */}
                            {/* <audio className='w-250px' controlsList="nodownload" controls preload="auto" src={`https://ejaz.azurewebsites.net/ejaz/v1/Medium/getImage/${initialSrc}`} ></audio> */}
                            <audio className='w-250px' controlsList="nodownload" controls preload="auto" src={`https://ejazapi.azurewebsites.net/ejaz/v1/Medium/getImage/${initialSrc}`} ></audio>
                            <button onClick={onDelete} className='btn btn-light align-self-center w-250px'>
                                <i className="fas fa-close fs-4 "></i>
                            </button>
                        </>
                    
                    
                    )}

                    </div>
                </div>
            </div>
            
        </>
    )
})
