/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {

	return (
		<section {...useBlockProps.save()}>
			<div className="d-none d-xl-block quick-links secondary-nav navbar navbar-expand-lg py-0">
				<div className="secondary-nav__wrapper border-blue-light border-1 border-top border-bottom py-2">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col">
								<div className="w-100 d-flex align-items-center">
									<h4 className="mb-0 text-smaller text-center">{attributes.heading}</h4>
									<div className="navbar-toc rounded-corners-lg px-3 gap-3">
										<ul className="navbar-nav">
											<li className="nav-item menu-item">
												<a href="#generalFeatures" target="_self" className="nav-link text-smaller" rel="noopener">Features</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
