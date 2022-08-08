import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { InnerBlocks } from "@wordpress/block-editor";
import { verticalAlignmentClass } from "../utilities";

export default function save({ attributes }) {

	const { image, alignmentImage, alignmentText, imageLeft, imageStyle, imageLink } = attributes;

	const directionClass = imageLeft ? "flex-md-reverse" : "";

	const props = useBlockProps.save({ className: 'py-3 py-lg-4' });

	if (props?.className?.includes('is-style-boxed-card')) {
		props.className += ' container mx-auto rounded-corners-md px-lg-5';
	}

	const theImage = <img width={image.width} height={image.height} loading="lazy" src={image.url} alt={image.alt} />;

	return (
		<div {...props}>
			<div className="container">
				<div className={"row row-cols-lg-2" + directionClass}>
					<div className={"col " + verticalAlignmentClass(alignmentText, true)}>
						<InnerBlocks.Content />
					</div>
					<div
						className={"col " + verticalAlignmentClass(alignmentImage, true)}
					>
						<div className={"wp-block-image " + imageStyle}>
							{imageLink?.length > 0 && <a href={imageLink}>{theImage}</a>}
							{imageLink?.length <= 0 && { theImage }}

						</div>
					</div>
				</div>
			</div>
		</div>
	);

}
