import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

registerBlockType(metadata.name, {
	attributes: {
		image: {
			type: "object",
			default: {},
		},
		alignmentImage: {
			type: "string",
			default: "top"
		},
		alignmentText: {
			type: "string",
			default: "top"
		},
		imageLeft: {
			type: "boolean",
			default: true
		},
		imageStyle: {
			type: "string",
			default: ""
		},
		imageLink: {
			type: "string"
		},
		textColumnClass: {
			type: "string"
		},
		imageColumnClass: {
			type: "string"
		}
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	save,
});
