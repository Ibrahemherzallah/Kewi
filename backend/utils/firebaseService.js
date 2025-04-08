import {bucket} from "./firebaseConfig.js";

/**
 * Uploads multiple images to Firebase Storage
 * @param {Array} files - Array of image files from request
 * @param {String} productId - Product ID to organize images
 * @returns {Array} - Array of image URLs
 */
export const uploadProductImages = async (files, productId) => {
    try {
        if (!files || files.length === 0) throw new Error("No images provided");

        const uploadPromises = files.map(async (file, index) => {
            const fileName = `product_images/${productId}/image_${index + 1}.${file.mimetype.split("/")[1]}`;
            const fileUpload = bucket.file(fileName);

            await fileUpload.save(file.buffer, {
                metadata: {contentType: file.mimetype},
                public: true
            });

            const [url] = await fileUpload.getSignedUrl({
                action: "read",
                expires: "03-01-2030",
            });

            return url;
        });

        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error("Firebase Upload Error:", error);
        throw error;
    }
};

export const uploadCategoryImage = async (file) => {
    try {
        if (!file) throw new Error("No image provided");

        const fileName = `category_images/${Date.now()}.${file.mimetype.split("/")[1]}`;
        const fileUpload = bucket.file(fileName);

        await fileUpload.save(file.buffer, {
            metadata: { contentType: file.mimetype },
        });

        const [url] = await fileUpload.getSignedUrl({
            action: "read",
            expires: "03-01-2030",
        });

        return url;
    } catch (error) {
        console.error("Firebase Upload Error:", error);
        throw error;
    }
};

export const uploadBrandImage = async (file) => {
    try {
        if (!file) throw new Error("No image provided");

        const fileName = `brand_images/${Date.now()}.${file.mimetype.split("/")[1]}`;
        const fileUpload = bucket.file(fileName);

        await fileUpload.save(file.buffer, {
            metadata: { contentType: file.mimetype },
        });

        const [url] = await fileUpload.getSignedUrl({
            action: "read",
            expires: "03-01-2030",
        });

        return url;
    } catch (error) {
        console.error("Firebase Upload Error:", error);
        throw error;
    }
};