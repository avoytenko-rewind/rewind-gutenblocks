export const verticalAlignmentClass = (position = 'top', frontend = false) => {

    if (frontend) {
        return 'align-self-' + position;
    }

    return 'is-vertically-aligned-' + position;
}