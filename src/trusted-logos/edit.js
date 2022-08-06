/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import GalleryUpload from '../components/GalleryUpload';


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

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
	const { images, imageIDs } = attributes;
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

	return (
		<div {...useBlockProps({ className: 'rw-block--fw' })}>
			<div className="box-item p-3 text-center">
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


			</div>

		</div>
	);
}
// export default function Edit({ attributes, setAttributes }) {
// 	const { images } = attributes;
// 	const imageKeys = Object.keys(images);

// 	function addNewImage() {
// 		const countKeys = imageKeys.length + 1;

// 		const newImages = { ...images, [countKeys]: { id: countKeys, imgID: '', imgSRC: '' } };

// 		setAttributes({
// 			images: newImages
// 		})
// 	}

// 	function deleteImage(key) {

// 		const newImages = { ...images };

// 		delete newImages[key];

// 		setAttributes({
// 			images: newImages
// 		})
// 	}

// 	function setImage(key, img) {
// 		const newImages = { ...images }

// 		console.log(key)
// 		newImages[key].imgSRC = img.url;

// 		setAttributes({
// 			images: newImages
// 		})
// 	}

// 	return (
// 		<div {...useBlockProps()}>
// 			<RichText
// 				className="mt-0 mb-0 has-custom-font-size has-normal-font-size text-center"
// 				tagName="h4" // The tag here is the element output and editable in the admin
// 				value={attributes.title} // Any existing content, either from the database or an attribute default
// 				allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
// 				onChange={(title) => setAttributes({ title })} // Store updated content as a block attribute
// 				placeholder={__('Title...')} // Display this text before any content has been added by the user
// 			/>
// 			<div className="repeatable-els flex-wrap">

// 				{imageKeys.length > 0 && imageKeys.map((key) => {
// 					const currentImage = images[key];

// 					return (<div key={currentImage.id} className="mx-1 box-item">

// 						<ImageUpload logo={currentImage} onLogoUpdate={setImage} />

// 						<Button onClick={() => deleteImage(currentImage.id)} isDestructive variant="link">
// 							Delete
// 						</Button>
// 					</div>);

// 				})}

// 				{!imageKeys.length && <p className="has-small-font-size text-center">Start adding elements..</p>}

// 				<Button onClick={addNewImage} variant="secondary">Add Image <Icon icon="plus" /></Button>
// 			</div>
// 		</div>
// 	);
// }
