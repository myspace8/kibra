"use client";

// Import statements
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { clsx } from "clsx";
import { lusitana } from "@/components/ui/fonts";
import { cva } from "class-variance-authority";
const SheetClose = SheetPrimitive.Close;
const Sheet = SheetPrimitive.Root;
const SheetPortal = SheetPrimitive.Portal;
const SheetTrigger = SheetPrimitive.Trigger;
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStateContext } from "@/context/state-context";
import { IoCartOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { BsQuestionSquare } from "react-icons/bs";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { fetchCollectionsByDepartment } from "@/utils/functions";
import { IoCalendarOutline } from "react-icons/io5";
import { RiShip2Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { useCollectionsByDepartment } from "@/hooks/useAllCollections";

export default function Header() {
  const { bagItems, getTotalQuantitiesInCart } = useStateContext();
  const totalQuantitiesInCart = getTotalQuantitiesInCart();

  // Initial state for the identity
  const [identity, setIdentity] = useState(1);

  useEffect(() => {
    // Interval to update the identity every 5 seconds
    const interval = setInterval(() => {
      // Update the identity (cycling from 1 to 2 and vice versa)
      setIdentity((prevIdentity) => (prevIdentity === 1 ? 2 : 1));
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className="bg-white border-b flex flex-col">
      {/* <DesktopBanner /> */}
      <div className="px-2 flex justify-between items-center py-2 md:w-[85%] md:m-auto">
        {/* <Sheet>
          <SheetTrigger asChild>
            <BiMenu className="text-4xl" />
          </SheetTrigger>
          <SheetContent side={"left"} className="w-[100vw]">
            <HeaderSheetContent />
          </SheetContent>
        </Sheet> */}

        <div className="flex flex-col items-center gap-1">
          <Link
            href={"/"}
            className={clsx(
              // lusitana.className,
              "flex text-xl font-bold italic md:text-2xl"
            )}
          >
            Kvinde Imports
          </Link>
        </div>

        <div>
          <Link className="" href={"/bag"}>
            <div>
              <IoCartOutline className="text-3xl text-black" />
            </div>
            {totalQuantitiesInCart > 0 ? (
              <div
                className={`bg-black border border-white w-5 h-5 rounded-full absolute top-1 right-2 flex justify-center items-center text-white text-sm`}
              >
                <p>{totalQuantitiesInCart}</p>
              </div>
            ) : null}
          </Link>
        </div>
      </div>
      {/* Rotating contents with conditional styling */}
      <div className="md:px-2">
        <div
        // style={{
        //   display: identity === 1 ? "none" : "block",
        //   transition: identity === 1 ? "" : "opacity 1s ease-in-out",
        //   opacity: identity === 1 ? 0 : 1,
        // }}
        >
          <MobileBanner />
        </div>
        {/* <div
          style={{
            display: identity === 2 ? "none" : "block ",
            transition: "opacity 0.5s ease-in-out",
            opacity: identity === 2 ? 0 : 1,
          }}
        >
          <div className="bg-orange-100 text-xs p-2 flex gap-1 items-center justify-center md:w-[85%] md:m-auto">
            <IoCalendarOutline className="text-sm" />
            <div className="flex w-full justify-between items-center">
              <span className="block">Third batch is closed. Fourth batch opens very soon</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

// function HeaderSheetContent() {
//   const [selectedDepartment, setSelectedDepartment] = useState({
//     id: "homeAndKitchen",
//     name: "Home & Kitchen",
//   });
//   const { collections, isLoading, isError } = useCollectionsByDepartment(selectedDepartment);
//   console.log(collections)
//   if (isLoading) {
//     return <div>Loading...</div>
//   }
//   if (isError) {
//     return <div>Error occured loading data...</div>
//   }

//   function handleDepartmentClick(department) {
//     setSelectedDepartment(department);
//   }

//   const allDepartments = [
//     { id: "homeAndKitchen", name: "Home & Kitchen" },
//     { id: "womensWatches", name: "Women's Watches" },
//     { id: "mensWatches", name: "Men's Watches" },
//     { id: "womensBagsAndLuggage", name: "Women's Bags & Luggage" },
//     { id: "mensBagsAndLuggage", name: "Men's Bags & Luggage" },
//     // ... other departments
//   ];

//   return (
//     <div className="fle flex-col justify-between h-full relative">
//       <div className="bg-black text-white py-3 px-1">
//         <p className="text-sm font-semibold">Kvinde Imports</p>
//       </div>
//       <div className="grid grid-cols-[96px_minmax(100px,_1fr)] h-full">
//         <div className="">
//           <div className="bg-gray-100 flex flex-col text-sm gap- h-full overflow-auto">
//             {allDepartments.map((department) => (
//               <div
//                 key={department.id}
//                 className={`flex items-center justify-center ${
//                   selectedDepartment?.id === department.id
//                     ? "bg-white border-l-4 border-orange-600"
//                     : ""
//                 }`}
//               >
//                 <button
//                   className="text-xs py-2 px-4 pl-1 font-medium focus:outline-none"
//                   onClick={() => handleDepartmentClick(department)}
//                 >
//                   {department.name}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* {collections.length === 0 && (
//           <div className="flex h-[80vh] justify-center text-sm items-center w-full flex-col">
//             <p>No item in this category</p>
//             <p className="text-gray-400">Updating soon.</p>
//           </div>
//         )} */}
//         <div className="overflow-auto">
//           <div className="grid grid-cols-2 gap-2 h-min py-2 mx-2 mb-12">
//             {collections.map((collection) => (
//               <div key={collection.id} className="w-full">
//                 <a
//                   href={`/collection/${collection.id}`}
//                   className="flex flex-col justify-center items-center gap-1"
//                 >
//                     {collection.images.length > 0 ? (

//                   <Image
//                     className="w-full h-28 top-0 left-0 object-cover"
//                     src={collection.images[0].src}
//                     width={500}
//                     height={500}
//                     alt=""
//                   />
//                 ) : (
//                     <Image
//                     className="w-full h-28 top-0 left-0 object-cover"
//                     src={"/placeholder-image.jpeg"}
//                     width={500}
//                     height={500}
//                     alt=""
//                   />
//                 )}
//                   <p className="text-xs text-cente text-gray-500 w-full">
//                     {collection.views < 2 ? (
//                       ""
//                     ) : (
//                       <p>
//                         <span className="text-orange-600">
//                           {collection.views}
//                         </span>{" "}
//                         people viewed recently
//                       </p>
//                     )}
//                   </p>
//                   <p className="text-xs font-bold text-cente text-gray-500 w-full">
//                     {collection.title}
//                   </p>
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function MobileBanner() {
  return (
    <div className="md:hidde">
      <Sheet>
        <SheetTrigger className="w-full">
          <div className="bg-orange-100 text-xs p-2 flex gap-1 items-center justify-between md:w-[85%] md:m-auto">
            <div className="flex gap-1 items-center">
              <HiOutlineReceiptRefund className="text-sm" />
              <span>Orders and refund policy</span>
            </div>
            <div>
              <IoIosArrowForward className="text-sm" />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="flex justify-center bg-[#f5f5f7] items-start gap-6 flex-col py- md:max-w-md md:m-auto max-h-[80vh] rounded-t-2xl"
        >
          <div className="overflow-auto rounded-t-2xl">
            <div className="flex text-xl items-center capitalize gap-4 font-bold justify-center rounded-t-2xl border-b py-4 sticky top-0 bg-white">
              <h1>Orders & refund policy</h1>
            </div>
            <div className="mt-6">
              <p className="text-center mx-6">
                {" "}
                <span className="text-2xl font-semibold block text-center">
                  Ordering from the website is as easy as sending a WhatsApp message.
                </span>{" "}
                {/* <span className="block mb-2">
                  This is why our prices are much lower than what you may see on
                  the market.
                </span>{" "}
                And as part of our effort to make shopping much affordable for
                everyone,{" "}
                <span className="text-orange-600">
                  we offer free shipping on most of our listed items.
                </span> */}
              </p>
            </div>
            <div className="bg-white mb-6 pb-4">
              <div className="bg-orange-50 p-1 mt-4 rounded-lg mx-2">
                <h1 className="font-semibold text-lg text-orange-600">Order</h1>
                <p className="text-sm pb-3">
                  <span className="font-semibold">Order Confirmation:</span>{" "}
                  Upon placing an order on our website, you will be directed to
                  WhatsApp. There, you will send the order in a form of a
                  message to us. This message signifies that your order has been
                  received and is being processed.
                </p>
                <p className="text-sm">
                  <span className="font-semibold pb-3">Payment Method:</span> We
                  accept payment via mobile money only. After your order is
                  confirmed, you will make payment to this number - 0202743233
                  (Adjei Afia Tiwaah) via mobile money. Take a screenshot of the
                  message and send to us on WhatsApp.
                </p>
              </div>
              <div className="bg-orange-50 p-1 mt-4 rounded-lg mx-2">
                <h1 className="font-semibold text-lg text-orange-600">
                  Refund policy
                </h1>
                <p className="text-sm pb-3">
                  <span className="font-semibold">
                    No Refund After Payment:
                  </span>{" "}
                  Once your order is confirmed and the payment is processed, we
                  do not offer refunds. Please review your order carefully
                  before finalizing the purchase.
                </p>
                <p className="text-sm">
                  <span className="font-semibold pb-3">
                    Exceptions for Defects or Errors:
                  </span>{" "}
                  We understand that unforeseen circumstances may occur. If you
                  receive a defective item or if there is an error on our
                  part in shipping, please contact us within 2 days after receiving
                  the product for resolution options.
                </p>
              </div>
            </div>
            <div className="bg-[#fff] py-6 px-2">
              <h2 className="font-bold text-lg">Have questions?</h2>
              <p className="text-xs">
                Connect with us on{" "}
                <a
                  href={`https://wa.me/${233202743233}/?text=${"Hi there,"}%0A%0A`}
                  className="text-blue-400"
                  target="_blank"
                >
                  WhatsApp
                </a>{" "}
                or
                <a
                  href={`tel:0202743233`}
                  className="text-blue-400"
                  target="_blank"
                >
                  {" "}
                  call
                </a>
                .
              </p>
            </div>
          </div>
          <div className="px-4 pb-4 w-full">
            <SheetClose className="flex focus:outline-none bg-white bottom-4 px-4 justify-center items-center border font-semibold border-gray-300 rounded-3xl w-full py-2">
              <span>Cancel</span>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function DesktopBanner() {
  return (
    <div className="hidden md:flex">
      <Sheet>
        <SheetTrigger className="w-full">
          <div className="bg-orange-100 text-xs py-2 px-20 gap-1 justify-between items-center flex">
            <div className="flex items-center gap-1">
              <HiOutlineReceiptRefund className="text-sm" />
              <span>Payment and refund policy</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineReceiptRefund className="text-sm" />
              <span>Payment and refund policy</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineReceiptRefund className="text-sm" />
              <span>Payment and refund policy</span>
            </div>
          </div>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="flex justify-center items-start gap-6 flex-col p-6 md:max-w-md md:m-auto max-h-[80vh] rounded-t-2xl"
        >
          <div className="">
            <div>
              <h1 className="font-semibold text-lg text-orange-600">Order</h1>
              <p className="text-sm pb-3">
                <span className="font-semibold">Order Confirmation:</span> Upon
                placing an order on our website, you will be directed to
                WhatsApp. There, you will send the order in a form of a message
                to us. This message signifies that your order has been received
                and is being processed.
              </p>
              <p className="text-sm">
                <span className="font-semibold pb-3">Payment Method:</span> We
                accept payment via mobile money only. After placing your order,
                you can make payment to this number - 0202743233 (Adjei Afia
                Tiwaah). Take a screenshot of the message and send to us via
                WhatsApp.
              </p>
            </div>
            <div>
              <h1 className="font-semibold text-lg text-orange-600 mt-4">
                Refund Policy
              </h1>
              <p className="text-sm pb-3">
                <span className="font-semibold">No Refund After Payment:</span>{" "}
                Once your order is confirmed and the payment is processed, we do
                not offer refunds. Please review your order carefully before
                finalizing the purchase.
              </p>
              <p className="text-sm">
                <span className="font-semibold pb-3">
                  Exceptions for Defects or Errors:
                </span>{" "}
                We understand that unforeseen circumstances may occur. If you
                receive a defective product or if there is an error on our part
                in shipping, please contact us within 2 days of receiving the
                product for resolution options.
              </p>
            </div>
            <p className="text-sm mt-4">
              For any inquiries or assistance regarding payments, refunds, or
              order-related concerns, please contact us via{" "}
              <a
                href={`https://wa.me/${233202743233}/?text=${"Hi there,"}%0A%0A`}
                className="text-blue-400"
                target="_blank"
              >
                WhatsApp
              </a>
              .
            </p>
          </div>

          <SheetClose className="flex justify-center items-center border font-semibold border-gray-300 rounded-3xl w-full py-2">
            <span>Cancel</span>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const SheetContent = React.forwardRef(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute right-[0] text-white border-l  p-2 top-0 rounded-se-md ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800">
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-slate-950/80",
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-white shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-slate-950",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);
