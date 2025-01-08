import { Mark } from '@tiptap/core';

// Create a custom extension for text highlighting
const CustomHighlight = Mark.create({
  name: 'highlight',

  // Define attributes for the extension
  addAttributes() {
    return {
      color: {
        default: '#FFFF00', // Default highlight color (yellow)
      },
    };
  },

  // Parse HTML to identify the highlight mark
  parseHTML() {
    return [
      {
        tag: 'span[data-highlight]',
      },
    ];
  },

  // Render the HTML for the highlight mark
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      {
        ...HTMLAttributes,
        'data-highlight': true,
        style: `background-color: ${HTMLAttributes.color};`,
      },
      0,
    ];
  },

  // Add a command to apply the highlight
  addCommands() {
    return {
      setHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      unsetHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export default CustomHighlight;
