import { __ } from "@wordpress/i18n";
import { PanelBody, SelectControl, ToggleControl, TextControl } from "@wordpress/components";
import ImageUpload from "../UI/ImageUpload";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";

import { verticalAlignmentClass } from "../utilities";

import "./editor.scss";

const MY_TEMPLATE = [
	["core/heading", { level: 3, content: "Your Title" }],
	["core/paragraph", { content: "Your text here" }],
];

export default function Edit({ attributes, setAttributes }) {
	const { image, alignmentImage, alignmentText, imageLeft, imageStyle, imageLink } = attributes;

	return (
		<div {...useBlockProps({ className: "box-item px-3" })}>
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
				</PanelBody>
			</InspectorControls>

			<div
				className="wp-block-columns is-style-rewind-cols row-cols-lg-2"
				style={{ "flex-direction": imageLeft ? "row-reverse" : "row" }}
			>
				<div
					className={
						"wp-block wp-block-column " + verticalAlignmentClass(alignmentText)
					}
				>
					<InnerBlocks template={MY_TEMPLATE} />
				</div>
				<div
					className={
						"wp-block p-3 wp-block-column " +
						verticalAlignmentClass(alignmentImage)
					}
				>
					<div className="box-item text-center">
						{image?.url && <div class={'wp-block-image ' + imageStyle}><img src={image.url} /></div>}
						<ImageUpload
							onImageUpdate={(image) => setAttributes({ image })}
							newImage={!image?.url}
							image={image?.id}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
