const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/hrscmrnr/image/upload";

const UPLOAD_PRESET = "StartupHub";

export async function uploadToCloudinary(file) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
        CLOUDINARY_URL,
        {
            method: "POST",
            body: formData
        }
    );

    if (!response.ok) {

        const errorData =
            await response.json().catch(() => null);

        console.error(
            "Cloudinary Error:",
            errorData
        );

        throw new Error("Image upload failed");
    }

    const data = await response.json();

    console.log(
        "Cloudinary uploaded:",
        data
    );

    return data.secure_url;
}