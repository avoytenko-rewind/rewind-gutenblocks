import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, PanelBody, FormFileUpload } from '@wordpress/components';

const ALLOWED_MEDIA_TYPES = ['image'];


export default function ImageUpload({ onLogoUpdate, logo }) {

    console.log(logo)

    const instructions = <p>{__('To edit the background image, you need permission to upload media.', 'rewind-theme')}</p>;
    // return <p>Logo</p>
    return <>
        <MediaUploadCheck fallback={instructions}>
            <MediaUpload
                title={__('Logo', 'rewind-theme')}
                onSelect={() => onLogoUpdate(logo.id)}
                allowedTypes={ALLOWED_MEDIA_TYPES}
                value={logo.imgID}
                render={({ open }) => (
                    <Button
                        className={'editor-post-featured-image__toggle'}
                        onClick={open}>
                        {__('Add Logo', 'rewind-theme')}
                    </Button>
                )}
            />
        </MediaUploadCheck>
    </>
}