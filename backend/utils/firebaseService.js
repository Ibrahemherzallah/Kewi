import {bucket} from "./firebaseConfig.js";

/**
 * Uploads multiple images to Firebase Storage
 * @param {Array} files - Array of image files from request
 * @param {String} productId - Product ID to organize images
 * @returns {Array} - Array of image URLs
 */
const uploadProductImages = async (files, productId) => {
    try {
        if (!files || files.length === 0) throw new Error("No images provided");

        const uploadPromises = files.map(async (file, index) => {
            const fileName = `product_images/${productId}/image_${index + 1}.${file.mimetype.split("/")[1]}`;
            const fileUpload = bucket.file(fileName);

            await fileUpload.save(file.buffer, {
                metadata: {contentType: file.mimetype},
            });

            // Generate signed URL (public link)
            const [url] = await fileUpload.getSignedUrl({
                action: "read",
                expires: "03-01-2030", // Adjust expiration as needed
            });

            return url;
        });

        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error("Firebase Upload Error:", error);
        throw error;
    }
};

export default uploadProductImages;
