
// Warning Component
export const Warning: React.FC = () => (
  <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
    <p className="text-sm text-black">
      Changes made in the editor are not automatically saved. Please download your edited image before leaving this page.
    </p>
  </div>
);

// Instructions Componen
export const Instructions: React.FC = () => (
  <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mt-6">
    <p className="text-sm text-blue-600">
      Use the left mouse button to draw on the image (with a circle) and the right mouse button to erase. After editing, you can preview and download the edited image.
    </p>
  </div>
);
