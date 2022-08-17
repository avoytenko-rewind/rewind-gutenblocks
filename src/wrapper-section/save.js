import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';


export default function save({ attributes }) {
	
	return (
		<section {...useBlockProps.save()}>
			<div className="container">
				<div className="row">
					<div className="col">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</section>
	);
}
