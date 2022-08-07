import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const ALLOWED_MEDIA_TYPES = ['image'];

export default function ImageUpload({ onImageUpdate, images }) {
    
    const instructions = <p>{__('To edit the background image, you need permission to upload media.', 'rewind-theme')}</p>;
    const logoIDs = images.map((img) => img.id);

    return <>
        <MediaUploadCheck fallback={instructions}>
            <MediaUpload
                title={__('Logos', 'rewind-theme')}
                onSelect={(img) => onImageUpdate(img)}
                value={logoIDs}
                allowedTypes={ALLOWED_MEDIA_TYPES}
                multiple={true}
                gallery={true}
                addToGallery={true}
                render={({ open }) => (
                    <Button
                        className={'editor-post-featured-image__toggle'}
                        onClick={open}>
                        {__('Add/Replace Images...', 'rewind-theme')}
                    </Button>
                )}
            />
        </MediaUploadCheck>
    </>
}