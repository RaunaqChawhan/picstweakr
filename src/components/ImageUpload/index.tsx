import React, { useState, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import styles from "./index.module.css";

const ImageUploader: React.FC = () => {
  const defaultImage =
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80";
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  //   const [imageName, setImageName] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [imageDescription, setImageDescription] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[] | undefined>(
    undefined
  );
  const [fictionalStory, setFictionalStory] = useState<string | null>(null);

  useEffect(() => {
    console.log(image);
    if (image) {
      console.log({ image });
      console.log("image effect");
      fetch("/api/describe", {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: image,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.description);
          setImageDescription(res.description);
        });
    }
  }, [image]);

  useEffect(() => {
    if (imageDescription) {
      const imageRequest = () =>
        fetch("/api/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageDescription }),
        })
          .then((res) => res.blob())
          .then((res) => {
            const imageURL = URL.createObjectURL(res);
            console.log(imageURL);
            return imageURL;
          });
      Promise.all([
        imageRequest(),
        imageRequest(),
        imageRequest(),
        imageRequest(),
      ]).then((res) => {
        console.log(res);
        setGeneratedImages(res);
      });
    }
  }, [imageDescription]);

  useEffect(() => {
    if (imageDescription) {
      fetch("/api/fiction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDescription }),
      })
        .then((res) => res.json())
        .then((res) => {
          setFictionalStory(res.response);
          console.log(res);
        });
    }
  }, [imageDescription]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if the file type is png, jpeg, or jpg
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        setImageSrc(URL.createObjectURL(file));
        const reader = new FileReader();
        reader.onload = () => {
          console.log(reader.result);
          setImage(reader.result);
          //   setImageName(file.name);
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert("Please select a PNG, JPEG, or JPG file.");
      }
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setImageSrc(undefined);
    setImageDescription(null);
    setGeneratedImages(undefined);
    setFictionalStory(null);
    const imageUploadElement = document!.getElementById(
      "picture"
    )! as HTMLInputElement;
    imageUploadElement.value = "";
  };

  return (
    <div className={styles["image-upload-container"]}>
      <div className="flex flex-col items-center">
        <div
          className="grid w-full max-w-sm items-center gap-1.5 mb-6"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          <p
            className="text-left font-bold mb-0"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Upload Image:
          </p>
          <Input
            id="picture"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            className={styles["image-upload"]}
          />
        </div>
        <Card className="w-[350px] mb-6">
          <CardContent className="pt-6 flex justify-center">
            <img
              src={image ? imageSrc : defaultImage}
              alt="Image"
              className="rounded-md object-cover"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            {/* <Button variant="outline">Cancel</Button> */}
            <Button
              onClick={handleDeleteImage}
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Remove
            </Button>
          </CardFooter>
        </Card>
        <p
          style={{ fontFamily: '"Inter", sans-serif' }}
          className="font-bold self-start pl-2"
        >
          Generated Images:
        </p>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm"
        >
          <CarouselContent>
            {generatedImages
              ? generatedImages.map((generatedImage, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-3">
                          <img
                            src={generatedImage}
                            alt="Image"
                            className="rounded-md object-cover"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              : Array.from({ length: 4 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-3">
                          <img
                            src={defaultImage}
                            alt="Image"
                            className="rounded-md object-cover"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="self-start">
        <ScrollArea className="h-[270px] w-[350px] rounded-md border p-4 mb-6">
          <p
            className="text-left font-bold mb-3 text-lg"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Describe the image:
          </p>
          <p
            className="text-left"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            {imageDescription
              ? imageDescription
              : "Description will populate in a moment...."}
          </p>
        </ScrollArea>
        <ScrollArea className="h-[270px] w-[350px] rounded-md border p-4">
          <p
            className="text-left font-bold mb-3 text-lg"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Short story based on description:
          </p>
          <p
            className="text-left"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            {fictionalStory
              ? fictionalStory
              : "Short story will populate in a moment."}
          </p>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ImageUploader;
