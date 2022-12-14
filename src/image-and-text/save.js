import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { InnerBlocks } from "@wordpress/block-editor";
import { verticalAlignmentClass } from "../utilities";

export default function save({ attributes }) {

	const { image, alignmentImage, alignmentText, imageLeft, imageStyle, imageLink, textColumnClass, imageColumnClass } = attributes;

	const directionClass = imageLeft ? "flex-md-row-reverse" : "";

	const props = useBlockProps.save({ className: 'py-3 py-lg-4' });

	if (props?.className?.includes('is-style-boxed-card')) {
		props.className += ' container mx-auto rounded-corners-md px-lg-5';
	}

	const theImage = <img width={image.width} height={image.height} loading="lazy" src={image.url} alt={image.alt} />;

	return (
		<div {...props}>
			<div className="container">
				<div className={"row row-cols-1 row-cols-lg-2 " + directionClass}>
					<div className={`col ${verticalAlignmentClass(alignmentText, true)} ${textColumnClass || ""}`}>
						<InnerBlocks.Content />
					</div>
					<div
						className={`col ${verticalAlignmentClass(alignmentImage, true)} ${imageColumnClass || ""}`}
					>
						
							{imageLink?.length > 0 && <a className={"wp-rewind-image mt-3 mt-lg-0 " + imageStyle} href={imageLink}>{theImage}</a>}
							{!imageLink?.length && <div className={"wp-rewind-image mt-3 mt-lg-0 " + imageStyle}>{theImage}</div>}
						
					</div>
				</div>
			</div>
		</div >
	);

}
