/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { Button, Icon } from '@wordpress/components';
import ImageUpload from '../components/ImageUpload';


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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
	const { images } = attributes;
	const imageKeys = Object.keys(images);

	function addNewImage() {
		const countKeys = imageKeys.length + 1;

		const newImages = { ...images, [countKeys]: { id: countKeys, imgID: '', imgSRC: '' } };

		setAttributes({
			images: newImages
		})
	}

	function deleteImage(key) {

		const newImages = { ...images };

		delete newImages[key];

		setAttributes({
			images: newImages
		})
	}

	function setImage(key) {

	}

	return (
		<div {...useBlockProps()}>
			<div className="repeatable-els flex-wrap">

				{imageKeys.length > 0 && imageKeys.map((key) => {
					const currentImage = images[key];

					return (<div key={currentImage.id} className="mx-1 box-item">

						<ImageUpload logo={currentImage} onLogoUpdate={setImage} />
				
						<Button onClick={() => deleteImage(currentImage.id)} isDestructive variant="link">
							Delete
						</Button>
					</div>);

				})}

				{!imageKeys.length && <p className="has-small-font-size text-center">Start adding elements..</p>}

				<Button onClick={addNewImage} variant="secondary">Add Image <Icon icon="plus" /></Button>
			</div>
		</div>
	);
}
