/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { Button, Icon } from '@wordpress/components';


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

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


	const { links } = attributes;

	const linkKeys = Object.keys(links);

	function saveLinkText(text, key) {
		const newLinks = { ...links };
		newLinks[key].value = text;

		setAttributes({
			links: newLinks
		})
	}

	function addNewLink() {
		const countKeys = Object.keys(links).length + 1;

		const newLinks = { ...links, [countKeys]: { id: countKeys, value: '' } };

		console.log(newLinks);
		setAttributes({
			links: newLinks
		})
	}

	function deleteLink(key) {

		const newLinks = { ...links };

		delete newLinks[key];

		setAttributes({
			links: newLinks
		})
	}

	const variableFontSize = linkKeys?.length && linkKeys?.length > 4 ? 'has-extra-small-font-size' : 'has-small-font-size';


	return (
		<div {...useBlockProps({ className: "box-item" })}>
			<div style={{ display: "flex", "align-items": "center", padding: "5px 0px" }}>
				<RichText
					className={"mt-0 mb-0 has-custom-font-size " + variableFontSize}
					tagName="h4" // The tag here is the element output and editable in the admin
					value={attributes.heading} // Any existing content, either from the database or an attribute default
					allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
					onChange={(heading) => setAttributes({ heading })} // Store updated content as a block attribute
					placeholder={__('Heading...')} // Display this text before any content has been added by the user
				/>

				{linkKeys && linkKeys.map(currentKey => {

					const currentLink = links[currentKey];
					return (
						<div className="mx-1" style={{ border: "1px dashed", padding: "5px", "border-radius": "4px", display: "flex", "align-items": "center" }}>
							<RichText
								key={currentLink.id}
								className={"has-custom-font-size " + variableFontSize}
								tagName="span" // The tag here is the element output and editable in the admin
								value={currentLink.value} // Any existing content, either from the database or an attribute default
								// allowedFormats={['core/bold', 'core/italic']} // Allow the content to be made bold or italic, but do not allow other formatting options
								onChange={(value) => saveLinkText(value, currentLink.id)} // Store updated content as a block attribute
								placeholder={__('Link here...')} // Display this text before any content has been added by the user
							/>
							<Button onClick={() => deleteLink(currentLink.id)} isDestructive variant="link">
								Delete
							</Button>
						</div>

					)
				}
				)}

				{!linkKeys.length && <p className="ms-1 has-custom-font-size has-small-font-size">Add your links here...</p>}


				<Button onClick={addNewLink} variant="secondary">Add Link <Icon icon="plus" /></Button>
			</div>
		</div>
	);
}
