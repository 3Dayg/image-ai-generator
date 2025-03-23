import Replicate from "replicate";

const replicate = new Replicate();

export async function generateImage(prompt, options) {
  const input = {
    prompt: prompt,
    aspect_ratio: options.aspect_ratio || "1:1",
    output_format: options.format || "webp",
    output_quality: options.quality || 80,
    safety_tolerance: 2,
    prompt_unsampling: true,
};

  const output = await replicate.run("black-forest-labs/flux-dev-lora", { input });
  const outputStream = output[0];
  const imageBlob = await outputStream.blob();
  const imageBuffer = await imageBlob.arrayBuffer();
  const image = Buffer.from(imageBuffer);

  return {
    image, 
    format: options.format 
  };
};