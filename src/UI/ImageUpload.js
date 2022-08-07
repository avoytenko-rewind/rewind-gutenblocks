import { __ } from "@wordpress/i18n";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

const ALLOWED_MEDIA_TYPES = ["image"];

export default function ImageUpload({
	onImageUpdate,
	imgID,
	className = "",
	newImage,
}) {
	const instructions = (
		<p>
			{__(
				"To edit the background image, you need permission to upload media.",
				"rewind-theme"
			)}
		</p>
	);

	let buttonText = __("Add Image...", "rewind-gutenblocks");
	let buttonClass = "editor-post-featured-image__toggle";

	if (!newImage) {
		buttonText = __("Replace Image...", "rewind-gutenblocks");
		buttonClass = "";
	}

	return (
		<div className={className}>
			<MediaUploadCheck fallback={instructions}>
				<MediaUpload
					title={__("Logos", "rewind-theme")}
					onSelect={(img) => onImageUpdate(img)}
					value={imgID}
					allowedTypes={ALLOWED_MEDIA_TYPES}
					multiple={false}
					render={({ open }) => (
						<Button className={buttonClass} variant="secondary" onClick={open}>
							{buttonText}
						</Button>
					)}
				/>
			</MediaUploadCheck>
		</div>
	);
}
