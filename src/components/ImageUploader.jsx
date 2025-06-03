import { useState, useEffect } from 'react';

export default function ImageUploader({ initialImage, onImageUpload, error = null, label = "Profile Photo", translate }) {
  const [preview, setPreview] = useState(initialImage || null);

  useEffect(() => {
    if (initialImage) setPreview(initialImage);
  }, [initialImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreview(base64);
      onImageUpload(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="md:col-span-2">
      <label
        htmlFor="profilePhotoUpload"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {translate ? translate('signup.profile_photo') : label}
      </label>

      <div className="flex items-center gap-4">
        {preview && (
          <div className="shrink-0">
            <img
              src={preview}
              alt="Preview"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-orange-500"
            />
          </div>
        )}

        <div className="flex-1">
          <input
            id="profilePhotoUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={`block w-full text-sm text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100
              dark:file:bg-gray-800 dark:file:text-gray-200 dark:hover:file:bg-gray-700
              ${error ? 'ring-1 ring-red-500' : ''}`}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
