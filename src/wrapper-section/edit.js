import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
	return (
		<div {...useBlockProps({ className: "box-item rw-block--section rw-block--fw rw-block" })}>
			<InnerBlocks />
		</div>
	);
}
