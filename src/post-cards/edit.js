import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
	return (
		<div {...useBlockProps({ className: "box-item rw-block--section rw-block--fw rw-block" })}>
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label="Image Alignment"
						value={alignmentImage}
						options={[
							{ label: "Top", value: "top" },
							{ label: "Center", value: "center" },
							{ label: "Bottom", value: "bottom" },
						]}
						onChange={(align) => setAttributes({ alignmentImage: align })}
					/>

					<SelectControl
						label="Text Alignment"
						value={alignmentText}
						options={[
							{ label: "Top", value: "top" },
							{ label: "Center", value: "center" },
							{ label: "Bottom", value: "bottom" },
						]}
						onChange={(align) => setAttributes({ alignmentText: align })}
					/>

					<ToggleControl
						label="Image on the left?"
						help={imageLeft ? "Image on the left" : "Image on the right"}
						checked={imageLeft}
						onChange={() => {
							setAttributes({ imageLeft: !imageLeft });
						}}
					/>

					<SelectControl
						label="Image Style"
						value={imageStyle}
						options={[
							{ label: "Default", value: "" },
							{ label: "Rounded", value: "is-style-rounded-corners" },
							{ label: "Rounded With Shadow", value: "is-style-rounded-corners is-style-w-shadow" },
						]}
						onChange={(style) => setAttributes({ imageStyle: style })}
					/>

					<TextControl
						label="Link on the image"
						value={imageLink}
						onChange={(link) => setAttributes({ imageLink: link })}
					/>

					<TextControl
						label="Text Column Class"
						value={textColumnClass}
						onChange={(classCol) => setAttributes({ textColumnClass: classCol })}
					/>

					<TextControl
						label="Image Column Class"
						value={imageColumnClass}
						onChange={(classCol) => setAttributes({ imageColumnClass: classCol })}
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
