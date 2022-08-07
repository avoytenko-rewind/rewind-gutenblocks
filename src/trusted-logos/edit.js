/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { Button, ToggleControl, PanelBody } from '@wordpress/components';
import GalleryUpload from '../UI/GalleryUpload';
import apiFetch from '@wordpress/api-fetch';
import { useEffect, RawHTML } from "@wordpress/element";



/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { images, isCustom, defaultLogos } = attributes;
	const imageKeys = Object.keys(images);


	function setImage(img) {
		setAttributes({
			images: img,
		})
	}

	function clearImages() {
		setAttributes({
			images: []
		})
	}

	useEffect(() => {
		if (!isCustom) {
			apiFetch({ url: ajaxurl + '?action=rw_header_trust_logos' }).then((data) => {
				setAttributes({ defaultLogos: data })
			});
		}
	}, []);


	function GlobalLogos() {

		if (!defaultLogos?.title && !defaultLogos?.logos) {
			return <p>Loading...</p>
		}

		return <div className="box-item p-3 text-center">
			<h4 className="mt-0 has-custom-font-size has-normal-font-size text-center">{defaultLogos.title}</h4>


			{defaultLogos?.logos?.length > 0 && <>
				<div className="repeatable-els">
					{defaultLogos.logos.map((logo) => {
						return <div class="box-item--image mx-2" key={logo}>
							<RawHTML>{logo}</RawHTML>
						</div>
					})}
				</div>
			</>}


		</div>
	}

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						label="Use Custom Images"
						help={
							isCustom
								? 'Use custom images.'
								: 'Use default images.'
						}
						checked={isCustom}
						onChange={() => {
							setAttributes({ isCustom: !isCustom });
						}}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps({ className: 'rw-block--fw' })}>
				{isCustom && <div className="box-item p-3 text-center">
					<RichText
						className="mt-0 has-custom-font-size has-normal-font-size text-center"
						tagName="h4" // The tag here is the element output and editable in the admin
						value={attributes.title} // Any existing content, either from the database or an attribute default
						allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
						onChange={(title) => setAttributes({ title })} // Store updated content as a block attribute
						placeholder={__('Title...')} // Display this text before any content has been added by the user
					/>

					{!imageKeys.length && <p className="has-small-font-size text-center">Start adding elements..</p>}

					<GalleryUpload onImageUpdate={setImage} images={images} />


					{images.length > 0 && <>

						<div className="repeatable-els">
							{Object.keys(images).map((imageKey) => {
								const currentImage = images[imageKey]
								return <div class="box-item--image mx-2" key={imageKey}>
									<img width="150px" src={currentImage.url} />
								</div>
							})}
						</div>

						<Button onClick={clearImages} isDestructive variant="link">
							Clear All Images
						</Button>
					</>}


				</div>}

				{!isCustom && <GlobalLogos />}

			</div>
		</>
	);
}
