"use client";

import ReactQuillEditor from "@/app/components/Reactquill";
import { TransparentButton } from "@/app/components/buttons/button";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GoSearch } from "react-icons/go";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import ReactSelectOptions from "@/app/components/select/ReactSelect";
import MainFooter from "@/app/components/footer/MainFooter";
import { useParams, useRouter } from "next/navigation";
import GoogleLocationSearch from "@/app/components/googleLocationSearch";
import {
  extractUrlBeforeQueryString,
  formatDate,
  formatTime,
  uploadImage,
} from "@/app/helpers";

// DETAILS

import Faq from "@/app/components/faq/Faq";
import FileUpload from "@/app/components/fileUpload/FileUpload";
import { BiPencil } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { updateLocalStorageField } from "@/app/utils/localstorage";

// TICKET

import { PiCreditCard } from "react-icons/pi";
import { IoMdMore } from "react-icons/io";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { GoPlus } from "react-icons/go";
import AddTicketType, {
  TicketInfo,
} from "@/app/components/ticketType/AddTicketType";
import { IoEyeSharp } from "react-icons/io5";
import ConfirmDeleteModal from "@/app/components/modals/ConfirmDelete";
import Stepper, { Step } from "@/app/components/stepper/Stepper";
import MobileStepper from "@/app/components/stepper/MobileStepper";
import { MdAttachMoney } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  eventsManagamentFunctions,
  uploadImageFunctions,
} from "@/app/utils/endpoints";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";
import { EventInfoType, FaqType } from "@/app/types";
import PrimaryLoading from "@/app/components/loaders/PrimaryLoading";
import { CiWarning } from "react-icons/ci";

const ticketOptions = [
  { icon: <IoEyeSharp />, title: "View ticket type" },
  { icon: <RiDeleteBin6Fill />, title: "Delete ticket type" },
];

type ValuePiece = Date | null;

const step: Step[] = [
  {
    title: "Basic info",
    path: "basic-info",
    isComplete: false,
    isActive: true,
  },
  { title: "Details", path: "details", isComplete: false, isActive: false },
  {
    title: "BasicTickets",
    path: "ticket",
    isComplete: false,
    isActive: false,
  },
];

export type Value = ValuePiece | [ValuePiece, ValuePiece];

type CProps = {
  eventId?: string | number | string[];
};

const CreateAndEditEvent = () => {
  const { eventId } = useParams();
  const [steps, setSteps] = useState<Step[]>(step);
  const [startDate, setStartDate] = useState<Value>(new Date());
  const [startTime, setStartTime] = useState<any>("10:00");
  const [endDate, setEndDate] = useState<Value>(new Date());
  const [endTime, setEndTime] = useState<any>("10:00");
  const [isOnlineEvent, setIsOnlineEvent] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [locationValue, setLocationValue] = useState<null | any>(null);
  const [quillValue, setQuillValue] = useState("");
  const [faqs, setFaqs] = useState<FaqType[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isComplete2, setIsComplete2] = useState(false);
  const [isComplete3, setIsComplete3] = useState(false);
  const [deleteTicketIndex, setDeleteTicketIndex] = useState<number>(0);
  const [viewTicketIndex, setViewTicketIndex] = useState<number | any>(null);
  const [tickets, setTickets] = useState([]);
  const [isImageUploadEnabled, setIsImageUploadEnabled] = useState(false);
  const [eventPhoto, setEventPhoto] = useState<any>([]);
  const [isLoadingBanner, setIsLoadingBanner] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [checkSlugStatus, setCheckSlugStatus] = useState(false);

  // TICKET
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [creationStatus, setCreationStatus] = useState({
    basicInfo: true,
    details: false,
    ticket: false,
  });
  const [ticketInfo, setTicketInfo] = useState<TicketInfo>({
    type: 1,
    name: "",
    stock: "unlimited",
    purchase_limit: 0,
    price: 0,
    // description: "",
  });

  // DETAILS
  const { data, status } = useQuery({
    queryKey: ["event-banner"],
    queryFn: () => uploadImageFunctions.getInitialURL(eventPhoto[0].name),
    enabled: isImageUploadEnabled,
    staleTime: Infinity,
  });

  const { data: eventCategoriesOptions } = useQuery({
    queryKey: ["event-categories"],
    queryFn: eventsManagamentFunctions.getCategories,
    staleTime: Infinity,
    select(data: any) {
      return data.events.map((event: { id: ""; name: "" }) => ({
        value: event.id,
        label: event.name.charAt(0).toUpperCase() + event.name.slice(1),
      }));
    },
  });

  const createEvent = useMutation({
    mutationFn: eventsManagamentFunctions.createEvent,
    onError: async (error, variables, context) => {
      console.log(` ${error}`);
    },
    onSuccess: async (data, variables, context) => {
      router.push("/dashboard/event");
    },
  });

  const updateEvent = useMutation({
    mutationFn: eventsManagamentFunctions.editEvent,
    onError: async (error, variables, context) => {
      console.log(` ${error}`);
    },
    onSuccess: async (data, variables, context) => {
      router.push("/dashboard/event");
    },
  });

  const { data: event, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["getEvent"],
    //@ts-ignore
    queryFn: () => eventsManagamentFunctions.getEventById({ eventId: eventId }),
    enabled: eventId ? true : false,
  });

  useEffect(() => {
    if (data?.url && status === "success" && !imageUrl) {
      const imageUploadFinalHandler = async () => {
        setIsLoadingBanner(true);
        try {
          const res = await uploadImage(data.url, eventPhoto[0]);
          setIsImageUploadEnabled(false);
          toast.success("Event banner uploaded successfully!!!");
          setImageUrl(extractUrlBeforeQueryString(data.url as string));
          setEventInfo((prev) => ({
            ...prev,
            medias: [extractUrlBeforeQueryString(data.url as string)],
          }));
        } catch {
          toast.error("Something went wrong!!!");
        } finally {
          setIsLoadingBanner(false);
        }
      };

      imageUploadFinalHandler();
    }
  }, [isImageUploadEnabled, status]);

  const [eventDetails, setEventDetails] = useState({
    isEditOrganizerInfo: false,
    isEditEventDetails: false,
    isEditEventLocation: false,
    isEditEventDateAndTime: false,
    isEditCustomUrl: false,
  });

  const toggleIsCompleteByIndex = (index: number, toggleTo: boolean): void => {
    setSteps((prevSteps) => {
      return prevSteps.map((s, i) => {
        if (i === index) {
          return { ...s, isComplete: toggleTo };
        } else {
          return s;
        }
      });
    });
  };

  const [eventInfo, setEventInfo] = useState<EventInfoType>({
    organizer: { name: "", phone: "" },
    name: "",
    description: "",
    location_type: 1,
    start_date: "",
    end_date: "",
    timezone: "Africa/Lagos",
    categories: [""],
    slug: "",
    location_details: {
      address: "",
      latitude: "",
      longitude: "",
    },
    registration_requirements: [
      { name: "firstName", required: true, title: "First name" },
      { name: "lastName", required: true, title: "Last name" },
      { name: "email", required: true, title: "Email" },
      { name: "tel", required: true, title: "Phone Number" },
      { name: "jobTitle", required: true, title: "Job title" },
      { name: "company", required: true, title: "Company" },
      { name: "address", required: true, title: "Address" },
    ],
    medias: [],
    faqs: [],
    tickets: [],
  });

  //update initial state when editing event
  useEffect(() => {
    if (event && eventId) {
      const mediaUrl = event.medias[0].original;
      eventInfo.organizer.name = event.organizer.name;
      eventInfo.organizer.phone = event.organizer.phone;
      eventInfo.name = event.name;
      eventInfo.description = event.description;
      setQuillValue(event.description);
      eventInfo.location_type = event.location_type;
      setIsOnlineEvent(!!event.locations[0]?.address ? false : true);
      eventInfo.location_type = !!event.locations[0]?.address ? 1 : 2;
      eventInfo.location_details.address = event?.locations[0]?.address;
      eventInfo.location_details.latitude = event?.locations[0]?.latitude;
      eventInfo.location_details.longitude = event?.locations[0]?.longitude;
      setStartDate(new Date(event.start_date));
      setEndDate(new Date(event.end_date));
      eventInfo.timezone = event.timezone;
      eventInfo.categories = event.categories[0]?.id;
      setSelectedOption({
        value: event.categories[0]?.id,
        label:
          eventCategoriesOptions &&
          eventCategoriesOptions.find(
            (e: any) => e.value === event.categories[0]?.id
          )?.label,
      });
      eventInfo.slug = event.slug;
      eventInfo.registration_requirements = event.registration_requirements;
      if (!!mediaUrl) {
        eventInfo.medias = [mediaUrl];
      } else {
        eventInfo.medias = [];
      }
      eventInfo.tickets = event.tickets.map((obj: any) => {
        return {
          name: obj.name,
          description: obj.description,
          price: obj.price,
          type: obj.type,
          stock: obj.stock,
          stock_qty: obj.stock_qty,
          purchase_limit: obj.purchase_limit,
          quantity_limit_per_person: obj.quantity_limit_per_person,
        };
      });
      setTickets(
        event.tickets.map((obj: any) => {
          return {
            name: obj.name,
            description: obj.description,
            price: obj.price,
            type: obj.type,
            stock: obj.stock,
            stock_qty: obj.stock_qty ?? 1,
            purchase_limit: obj.purchase_limit,
            quantity_limit_per_person: obj.quantity_limit_per_person,
          };
        })
      );

      setFaqs(
        event.faqs.map((obj: any) => {
          return {
            question: obj.question,
            answer: obj.answer,
          };
        })
      );

      setImageUrl(event.medias[0].original);
      setEventPhoto([mediaUrl]);
    }
  }, [event]);

  const computeDateTime = useCallback((date: any, time: any) => {
    const dateString = date?.toISOString()?.split("T")[0];
    const dateTimeString = `${dateString}T${time}`;
    return dateTimeString;
  }, []);

  useEffect(() => {
    const startDateTime = computeDateTime(startDate, startTime);
    setEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      start_date: startDateTime,
    }));
  }, [startDate, startTime, computeDateTime]);

  useEffect(() => {
    const endDateTime = computeDateTime(endDate, endTime);
    setEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      end_date: endDateTime,
    }));
  }, [endDate, endTime, computeDateTime]);

  const computeEventCategory = useCallback(() => {
    setEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      categories: selectedOption ? [selectedOption.value] : [""],
    }));
  }, [selectedOption]);

  useEffect(() => {
    computeEventCategory();
  }, [computeEventCategory]);

  const computeEventDescrption = useCallback(() => {
    setEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      description: quillValue,
    }));
  }, [quillValue]);

  useEffect(() => {
    computeEventDescrption();
  }, [computeEventDescrption]);

  useEffect(() => {
    if (tickets.length > 0) {
      setIsComplete3(true);
      toggleIsCompleteByIndex(2, true);
    } else {
      toggleIsCompleteByIndex(2, false);
    }
  }, [tickets.length]);

  const {
    data: slugCheck,
    isLoading: isCheckingSlug,
    refetch,
  } = useQuery({
    queryKey: ["check-slug"],
    //@ts-ignore
    queryFn: () => eventsManagamentFunctions.checkSlug(eventInfo.slug),
    enabled: checkSlugStatus,
  });

  useEffect(() => {
    if (creationStatus.details) {
      refetch();
      // setCheckSlugStatus(true);
    }
  }, [creationStatus.details]);

  const hasValues = useMemo(() => {
    return (
      eventInfo.organizer.name !== "" &&
      eventInfo.organizer.phone !== "" &&
      eventInfo.name !== "" &&
      eventInfo.description !== "" &&
      eventInfo.categories[0] !== "" &&
      eventInfo.location_type !== 0 &&
      (eventInfo.location_type === 2 ||
        (eventInfo.location_type === 1 &&
          eventInfo.location_details.address !== "" &&
          eventInfo.location_details.latitude !== "" &&
          eventInfo.location_details.longitude !== "")) &&
      eventInfo.start_date !== "" &&
      eventInfo.end_date !== "" &&
      eventInfo.timezone !== ""
    );
  }, [eventInfo]);

  useEffect(() => {
    if (selectedOption?.length > 0 && selectedOption[0]?.value) {
      setEventInfo((prev) => ({ ...prev, categories: [selectedOption.value] }));
    }
  }, [selectedOption]);

  const checkCompletion = () => {
    setIsComplete(hasValues);
    toggleIsCompleteByIndex(0, hasValues);
  };

  const checkCompletion2 = () => {
    setIsComplete2(hasValues && eventInfo.medias.length > 0);
    toggleIsCompleteByIndex(1, hasValues && eventInfo.medias.length > 0);
  };

  const memoizedEventInfo = useMemo(() => eventInfo, [eventInfo]);
  useEffect(() => {
    checkCompletion();
    checkCompletion2();
  }, [memoizedEventInfo, creationStatus.details]);

  const router = useRouter();

  const nextHandlerOne = () => {
    setCreationStatus((prev) => ({
      ...prev,
      basicInfo: false,
      details: true,
    }));
  };

  const nextHandlerTwo = () => {
    setCreationStatus((prev) => ({ ...prev, details: false, ticket: true }));
  };

  const nextHandlerThree = () => {
    toggleIsCompleteByIndex(2, true);
    const { location_details, ...rest } = eventInfo;
    const updatedEventInfo =
      eventInfo.location_type === 2
        ? { ...rest, tickets: [...tickets] }
        : { ...eventInfo, tickets: [...tickets] };
    updatedEventInfo?.tickets.forEach((ticket) => {
      //@ts-ignore
      if (ticket?.stock === "unlimited") {
        //@ts-ignore
        delete ticket?.stock_qty;
      }
    });
    if (eventId) {
      updateEvent.mutate({ eventId: eventId, data: updatedEventInfo });
    } else {
      createEvent.mutate({ data: updatedEventInfo });
    }
  };

  const setActiveStepByIndex = (index: number): Step[] => {
    return steps.map((step, i) => {
      if (i === index) {
        return { ...step, isActive: true };
      } else {
        return { ...step, isActive: false };
      }
    });
  };

  const deleteTicketByIndex = () => {
    setTickets((prevTickets) => {
      const updatedTickets = [...prevTickets];
      updatedTickets.splice(deleteTicketIndex, 1);
      return updatedTickets;
    });
  };

  useEffect(() => {
    if (creationStatus.basicInfo) {
      setSteps(setActiveStepByIndex(0));
    } else if (creationStatus.details) {
      setSteps(setActiveStepByIndex(1));
    } else {
      setSteps(setActiveStepByIndex(2));
    }
  }, [creationStatus.basicInfo, creationStatus.details, creationStatus.ticket]);

  const backHandler = () => {
    if (creationStatus.basicInfo) {
      router.push("/dashboard/event");
    } else if (creationStatus.details) {
      setCreationStatus((prev) => ({
        ...prev,
        details: false,
        basicInfo: true,
      }));
    } else {
      setCreationStatus((prev) => ({
        ...prev,
        details: true,
        ticket: false,
      }));
    }
  };

  // DETAILS
  const thumbs = eventPhoto.map((file: any) => (
    <div key={file.name}>
      <div>
        <img
          src={imageUrl ? imageUrl : file.preview}
          className="w-full h-[248px] object-cover"
          // Revoke data uri after image is loaded
          onLoad={() => {
            setIsImageUploadEnabled(true);
            URL.revokeObjectURL(file.preview);
          }}
          alt=""
        />
      </div>
    </div>
  ));

  useEffect(() => {
    if (viewTicketIndex !== null) {
      setTicketInfo(tickets[viewTicketIndex]);
    }
  }, [viewTicketIndex]);

  useEffect(() => {
    if (eventPhoto.length > 0) {
      setEventInfo((prev) => ({
        ...prev,
        medias: [thumbs.preview ? thumbs.preview : imageUrl],
      }));
    } else if (eventPhoto.length === 0 && eventInfo.medias.length > 0) {
      setEventInfo((prev) => ({ ...prev, medias: [] }));
    }
  }, [eventPhoto]);

  //this is to update the slug
  useEffect(() => {
    if (eventInfo.name && creationStatus.basicInfo === true) {
      setEventInfo((prev) => ({
        ...prev,
        slug: eventInfo?.name?.toLowerCase()?.split(" ").join("-"),
      }));
    }
  }, [eventInfo.name]);

  if (eventId && isLoadingEvent) {
    return <PrimaryLoading />;
  }

  return (
    <section>
      <div className="flex justify-between md:space-x-16 lg:space-x-0">
        <div>
          <Stepper steps={steps} />
        </div>
        <main className="flex-1 lg:flex-none w-[50%] lg:w-[748px] ">
          <>
            <div className="mb-6 md:mb-0">
              <MobileStepper steps={steps} />
            </div>

            {creationStatus.basicInfo ? (
              <div className="w-[94%] mx-auto  mb-20 ">
                <div>
                  <h2 className="text-[24px] font-semibold">
                    Organizers Information
                  </h2>
                  <p className="text-gray-500 w-[70%] mt-2 mb-9">
                    Please provide your full name, email address, and a phone
                    number where we can reach you.
                  </p>
                  <div className="flex flex-col gap-6 md:flex-row items-center  ">
                    <div className="w-full md:basis-1/2">
                      <label
                        className="text-sm text-gray-800"
                        htmlFor="organizerName"
                      >
                        Organizer&apos;s name{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={eventInfo.organizer.name}
                        onChange={(e) =>
                          setEventInfo((prev) => ({
                            ...prev,
                            organizer: {
                              ...prev.organizer,
                              name: e.target.value,
                            },
                          }))
                        }
                        type="text"
                        className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                      />
                    </div>
                    <div className="w-full md:basis-1/2">
                      <label
                        className="text-sm text-gray-800"
                        htmlFor="organizerName"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={eventInfo.organizer.phone}
                        onChange={(e) =>
                          setEventInfo((prev) => ({
                            ...prev,
                            organizer: {
                              ...prev.organizer,
                              phone: e.target.value,
                            },
                          }))
                        }
                        type="tel"
                        className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-8" />

                <div>
                  <h2 className="text-[24px] font-semibold">
                    Event&apos;s Details
                  </h2>
                  <p className="text-gray-500 w-[90%] md:w-[70%] mt-2 mb-9">
                    Please provide your full name, email address, and a phone
                    number where we can reach you.
                  </p>
                  <div>
                    <label
                      className="text-sm text-gray-800"
                      htmlFor="organizerName"
                    >
                      Event name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={eventInfo.name}
                      onChange={(e) =>
                        setEventInfo((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Quick description of your Event name"
                      className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                    />
                  </div>
                  <div className="my-6">
                    <label
                      className="text-sm mb-2 block text-gray-800"
                      htmlFor="organizerName"
                    >
                      Event Category <span className="text-red-500">*</span>
                    </label>
                    {/* <input
            type="text"
            placeholder="Select category"
            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
          /> */}
                    <ReactSelectOptions
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      options={eventCategoriesOptions}
                    />
                  </div>
                  <div className="my-6 ">
                    <label
                      className="text-sm block text-gray-800 mb-2"
                      htmlFor="organizerName"
                    >
                      Description of your event{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <ReactQuillEditor
                      value={quillValue}
                      setValue={setQuillValue}
                    />
                  </div>
                </div>

                <hr className="my-8 " />

                <div>
                  <h2 className="text-[24px] font-semibold">
                    Event&apos;s Location
                  </h2>
                  <p className="text-gray-500 w-[70%] mt-2 mb-9">
                    Specify the venue name and address, including any relevant
                    room numbers
                  </p>
                  <div className="mt-9 mb-6 w-full md:w-[80%] flex items-center space-x-6">
                    <button
                      onClick={() => {
                        setIsOnlineEvent(false);
                        setEventInfo((prev) => ({ ...prev, location_type: 1 }));
                      }}
                      className={` ${
                        !isOnlineEvent
                          ? "border border-primaryPurple bg-lightPurple text-primaryPurple"
                          : "border-lightText text-lightText bg-transparent"
                      } w-full hover:bg-lightPurple transition-all duration-300 ease-in-out h-12 border rounded-lg   flex items-center justify-center`}
                    >
                      <p>Venue</p>
                    </button>
                    <button
                      onClick={() => {
                        setIsOnlineEvent(true);
                        setEventInfo((prev) => ({ ...prev, location_type: 2 }));
                      }}
                      className={` ${
                        isOnlineEvent
                          ? "border border-primaryPurple bg-lightPurple text-primaryPurple"
                          : "border-lightText text-lightText bg-transparent"
                      }  w-full hover:bg-lightPurple transition-all duration-300 ease-in-out h-12 border rounded-lg   flex items-center justify-center`}
                    >
                      <p>Online Event</p>
                    </button>
                  </div>
                  {!isOnlineEvent && (
                    <GoogleLocationSearch
                      value={locationValue}
                      setValue={setLocationValue}
                      setEventInfo={setEventInfo}
                    />
                  )}
                </div>

                <hr className="my-6" />

                <div className="mb-12">
                  <h2 className="text-[24px] font-semibold">Date and Time</h2>
                  <p className="text-gray-500 w-[70%] mt-2 mb-9">
                    Indicate the exact date and time your event will take place,
                    including the start and end time
                  </p>
                  <p className="text-sm mt-[36px] mb-6">
                    Think of a special event. It happens once and goes on for
                    many days
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="basis-1/2">
                      <label
                        className="text-sm mb-2 block text-gray-800"
                        htmlFor="organizerName"
                      >
                        Event start date <span className="text-red-500">*</span>
                      </label>
                      <div>
                        <DatePicker
                          className="outline-green-500"
                          onChange={setStartDate}
                          value={startDate}
                        />
                      </div>
                      {/* <input
              type="text"
              className="h-[56px] text-sm w-[338px] text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            /> */}
                    </div>
                    <div className="basis-1/2">
                      <label
                        className="text-sm mb-2 block text-gray-800"
                        htmlFor="organizerName"
                      >
                        Event start time <span className="text-red-500">*</span>
                      </label>
                      <div>
                        <TimePicker onChange={setStartTime} value={startTime} />
                      </div>

                      {/* <input
              type="text"
              className="h-[56px] text-sm w-[338px] text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            /> */}
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 mt-6">
                    <div className="basis-1/2">
                      <label
                        className="text-sm block mb-2 text-gray-800"
                        htmlFor="organizerName"
                      >
                        Event end date <span className="text-red-500">*</span>
                      </label>
                      <div>
                        <DatePicker onChange={setEndDate} value={endDate} />
                      </div>
                      {/* <input
              type="text"
              className="h-[56px] text-sm w-[338px] text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            /> */}
                    </div>
                    <div className="basis-1/2">
                      <label
                        className="text-sm block mb-2 text-gray-800"
                        htmlFor="organizerName"
                      >
                        Event end times <span className="text-red-500">*</span>
                      </label>
                      <div>
                        <TimePicker onChange={setEndTime} value={endTime} />
                      </div>
                      {/* <input
              type="text"
              className="h-[56px] text-sm w-[338px] text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            /> */}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-[24px] font-semibold">
                    Registration Requirements
                  </h2>
                  <p className="text-gray-500 w-[70%] mt-2 mb-9">
                    Which fields do you require the event registrants to
                    provide?
                  </p>
                  <div className="grid grid-cols-2 gap-y-9">
                    {eventInfo.registration_requirements.map((item) => (
                      <div key={item.name} className="flex space-x-3 ">
                        <div>
                          <input
                            type="checkbox"
                            // defaultChecked
                            name={item.name}
                            checked={item.required}
                            onChange={(e) => {
                              const { name, checked } = e.target;
                              if (
                                name === "firstName" ||
                                name === "lastName" ||
                                name === "email"
                              ) {
                                return; // Prevent unchecking these fields
                              }

                              setEventInfo((prev) => ({
                                ...prev,
                                registration_requirements:
                                  prev.registration_requirements.map((item) =>
                                    item.name === name
                                      ? { ...item, required: checked }
                                      : item
                                  ),
                              }));
                            }}
                            className="accent-primaryPurple"
                          />
                        </div>
                        <div>
                          {item.title}
                          <p className="text-lightText">
                            Get attendee {item.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <MainFooter
                  isComplete={isComplete}
                  nextHandler={nextHandlerOne}
                  backHandler={backHandler}
                />
              </div>
            ) : creationStatus.details ? (
              <section className="mb-20  w-[94%] mx-auto md:w-full   ">
                <div className="flex items-center justify-between">
                  <p className="text-sm w-full text-gray-700 mb-2">
                    Add a photo of your event{" "}
                    <span className="text-red-600">*</span>
                  </p>

                  {isLoadingBanner && (
                    <p className="text-[#7431B8] text-sm animate-pulse text-nowrap whitespace-nowrap">
                      Image Uploading...
                    </p>
                  )}
                </div>

                {eventPhoto.length === 0 && (
                  <div className="w-full relative flex items-center justify-center h-[248px] border border-dashed rounded-lg border-gray-600">
                    <FileUpload setEventPhoto={setEventPhoto} />
                  </div>
                )}
                {eventPhoto.length > 0 && (
                  <div className="w-full relative overflow-hidden flex items-center justify-center h-[248px] border rounded-lg border-primaryPurple hover:bg-lightPurple">
                    <div
                      aria-disabled={isLoadingBanner}
                      onClick={() => setEventPhoto([])}
                      className="w-[72px] h-[72px] cursor-pointer text-3xl transition-all duration-300 ease-in-out hover:text-red-500 hover:bg-red-100 rounded-full bg-white grid place-content-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      {isLoadingBanner && (
                        <div className="text-5xl ml-2 rounded-full   z-[99999999999]">
                          <FadeLoader color="#7431B8" />
                        </div>
                      )}
                      {!isLoadingBanner && (
                        <RiDeleteBin6Fill
                          onClick={() => {
                            setEventPhoto([]);
                            setEventInfo((prev) => ({ ...prev, medias: [] }));
                            setImageUrl("");
                            setIsImageUploadEnabled(false);
                          }}
                        />
                      )}
                    </div>
                    <div>{thumbs}</div>
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-5 mt-16">Preview</h3>

                {/* Organizer&apos;s Information */}

                <div className="">
                  {!eventDetails.isEditOrganizerInfo ? (
                    <div className=" w-full py-5 border-[.3px] border-gray-300 px-6 shadow-lg rounded-md relative">
                      <div
                        onClick={() =>
                          setEventDetails((prev) => ({
                            ...prev,
                            isEditOrganizerInfo: true,
                          }))
                        }
                        className="absolute -top-3 -right-3 cursor-pointer hover:bg-primaryPurple hover:text-white w-12 h-12 rounded-full text-primaryPurple bg-lightPurple grid place-content-center"
                      >
                        <BiPencil />
                      </div>
                      <p className="font-semibold ">
                        Organizer&apos;s Information
                      </p>
                      <div className="mt-4  flex items-center justify-between">
                        <div className="w-[45%]">
                          <p className="text-sm text-lightText">
                            Organizer&apos;s name
                          </p>
                          <p>{eventInfo.organizer.name}</p>
                        </div>
                        <div className="w-[45%]">
                          <p className="text-sm text-lightText">Phone</p>
                          <p>{eventInfo.organizer.phone}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-[2px] p-6 border-primaryPurple rounded-md">
                      <div className="flex justify-between items-center">
                        <h2 className="text-[24px] font-semibold">
                          Organizers Information
                        </h2>
                        <div
                          onClick={() =>
                            setEventDetails((prev) => ({
                              ...prev,
                              isEditOrganizerInfo: false,
                            }))
                          }
                          className="text-2xl cursor-pointer text-gray-700 hover:text-gray-400"
                        >
                          <FaAngleDown />
                        </div>
                      </div>

                      <p className="text-gray-500 w-[70%] mt-2 mb-9">
                        Please provide your full name, email address, and a
                        phone number where we can reach you.
                      </p>
                      <div className="flex items-center space-x-6 ">
                        <div className="basis-1/2">
                          <label
                            className="text-sm text-gray-800"
                            htmlFor="organizerName"
                          >
                            Organizer&apos;s name{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            value={eventInfo.organizer.name}
                            onChange={(e) =>
                              setEventInfo((prev) => ({
                                ...prev,
                                organizer: {
                                  ...prev.organizer,
                                  name: e.target.value,
                                },
                              }))
                            }
                            type="text"
                            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                          />
                        </div>
                        <div className="basis-1/2">
                          <label
                            className="text-sm text-gray-800"
                            htmlFor="organizerName"
                          >
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            value={eventInfo.organizer.phone}
                            onChange={(e) =>
                              setEventInfo((prev) => ({
                                ...prev,
                                organizer: {
                                  ...prev.organizer,
                                  phone: e.target.value,
                                },
                              }))
                            }
                            type="tel"
                            className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Custom url */}
                <div className="mt-8">
                  {!eventDetails.isEditCustomUrl ? (
                    <div className=" w-full py-5 border-[.3px] border-gray-300 px-6 shadow-lg rounded-md relative">
                      <div
                        onClick={() =>
                          setEventDetails((prev) => ({
                            ...prev,
                            isEditCustomUrl: true,
                          }))
                        }
                        className="absolute -top-3 -right-3 cursor-pointer hover:bg-primaryPurple hover:text-white w-12 h-12 rounded-full text-primaryPurple bg-lightPurple grid place-content-center"
                      >
                        <BiPencil />
                      </div>
                      <p className="font-semibold ">Custom Url</p>
                      <div className="mt-4  flex items-center justify-between">
                        <div className="w-[100%]">
                          <p className="text-sm text-lightText">Url</p>
                          <div className="flex items-center">
                            <p>eventsparrot.com/ </p>
                            <p>{eventInfo.slug}</p>
                            {slugCheck?.exists && <CiWarning color="red" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-[2px] p-6 border-primaryPurple rounded-md">
                      <div className="flex justify-between items-center">
                        <h2 className="text-[24px] font-semibold">
                          Custom Url
                        </h2>
                        <div
                          onClick={() =>
                            setEventDetails((prev) => ({
                              ...prev,
                              isEditCustomUrl: false,
                            }))
                          }
                          className="text-2xl cursor-pointer text-gray-700 hover:text-gray-400"
                        >
                          <FaAngleDown />
                        </div>
                      </div>

                      <p className="text-gray-500 w-[70%] mt-2 mb-9">
                        You can edit your url
                      </p>
                      <div className="flex items-center space-x-6 ">
                        <div className="basis-full">
                          <label
                            className="text-sm text-gray-800"
                            htmlFor="organizerName"
                          >
                            Custom url
                          </label>
                          <div className="grid grid-cols-3 gap-4">
                            <input
                              value={"eventsparrot.com/"}
                              readOnly
                              type="text"
                              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600 col-span-1"
                            />
                            <div className="w-full col-span-2">
                              <input
                                // value={eventInfo.organizer.phone}
                                value={eventInfo.slug}
                                onChange={(e) =>
                                  setEventInfo((prev) => ({
                                    ...prev,
                                    slug: e.target.value,
                                  }))
                                }
                                onBlur={() => refetch()}
                                type="tel"
                                className={`h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600 ${
                                  slugCheck.exists && "border border-red-500"
                                }`}
                              />
                            </div>
                            <div className="col-span-3">
                              {slugCheck?.exists && (
                                <p className="mt-2 text-red-500 text-sm text-end">
                                  This name has been taken! Please try again.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Event&apos;s Details */}

                <div className="mt-8">
                  {!eventDetails.isEditEventDetails ? (
                    <div className=" w-full py-5 border-[.3px] border-gray-300 px-6 shadow-lg rounded-md relative ">
                      <div
                        onClick={() =>
                          setEventDetails((prev) => ({
                            ...prev,
                            isEditEventDetails: true,
                          }))
                        }
                        className="absolute -top-3 -right-3 cursor-pointer hover:bg-primaryPurple hover:text-white w-12 h-12 rounded-full text-primaryPurple bg-lightPurple grid place-content-center"
                      >
                        <BiPencil />
                      </div>
                      <p className="font-semibold ">Event&apos;s details</p>
                      <div className="mt-4">
                        <div className="w-[90%]">
                          <p className="text-sm text-lightText">Event name</p>
                          <p>{eventInfo.name}</p>
                        </div>
                        <div className="w-full my-4">
                          <p className="text-sm text-lightText">Event Info</p>
                          <p
                            className="w-full"
                            dangerouslySetInnerHTML={{
                              __html: eventInfo.description,
                            }}
                          ></p>
                        </div>
                        <div className="">
                          <p className="text-sm text-lightText">
                            Event category
                          </p>
                          <p>{selectedOption?.label}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-[2px] p-6 border-primaryPurple rounded-md pb-12">
                      <div className="flex justify-between items-center">
                        <h2 className="text-[24px] font-semibold">
                          Event&apos;s Details
                        </h2>
                        <div
                          onClick={() =>
                            setEventDetails((prev) => ({
                              ...prev,
                              isEditEventDetails: false,
                            }))
                          }
                          className="text-2xl cursor-pointer text-gray-700 hover:text-gray-400"
                        >
                          <FaAngleDown />
                        </div>
                      </div>
                      <p className="text-gray-500 w-[70%] mt-2 mb-9">
                        Please provide your full name, email address, and a
                        phone number where we can reach you.
                      </p>
                      <div>
                        <label
                          className="text-sm text-gray-800"
                          htmlFor="organizerName"
                        >
                          Event name <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={eventInfo.name}
                          onChange={(e) =>
                            setEventInfo((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          type="text"
                          placeholder="Quick description of your Event name"
                          className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
                        />
                      </div>
                      <div className="my-6">
                        <label
                          className="text-sm mb-2 block text-gray-800"
                          htmlFor="organizerName"
                        >
                          Event Category <span className="text-red-500">*</span>
                        </label>
                        {/* <input
              type="text"
              placeholder="Select category"
              className="h-[56px] text-sm w-full text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
            /> */}
                        <ReactSelectOptions
                          selectedOption={selectedOption}
                          setSelectedOption={setSelectedOption}
                          options={eventCategoriesOptions}
                        />
                      </div>
                      <div className="my-6">
                        <label
                          className="text-sm block text-gray-800 mb-2"
                          htmlFor="organizerName"
                        >
                          Description of your event{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <ReactQuillEditor
                          value={quillValue}
                          setValue={setQuillValue}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Events Location */}

                <div className="mt-8">
                  {!eventDetails.isEditEventLocation ? (
                    <div className=" w-full py-5 border-[.3px] border-gray-300 px-6 shadow-lg rounded-md relative">
                      <div
                        onClick={() =>
                          setEventDetails((prev) => ({
                            ...prev,
                            isEditEventLocation: true,
                          }))
                        }
                        className="absolute -top-3 -right-3 cursor-pointer hover:bg-primaryPurple hover:text-white w-12 h-12 rounded-full text-primaryPurple bg-lightPurple grid place-content-center"
                      >
                        <BiPencil />
                      </div>
                      <p className="font-semibold ">Event&apos;s location</p>
                      <div className="mt-4">
                        <div className="">
                          <p className="text-sm text-lightText">
                            Venue Address
                          </p>
                          <p>
                            {eventInfo.location_type === 1
                              ? eventInfo.location_details.address
                              : "Online Event"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-[2px] p-6 border-primaryPurple rounded-md">
                      <div className="flex items-center justify-between">
                        <h2 className="text-[24px] font-semibold">
                          Event&apos;s Location
                        </h2>
                        <div
                          onClick={() =>
                            setEventDetails((prev) => ({
                              ...prev,
                              isEditEventLocation: false,
                            }))
                          }
                          className="text-2xl cursor-pointer text-gray-700 hover:text-gray-400"
                        >
                          <FaAngleDown />
                        </div>
                      </div>

                      <p className="text-gray-500 w-[70%] mt-2 mb-9">
                        Specify the venue name and address, including any
                        relevant room numbers
                      </p>
                      <div className="mt-9 mb-6 flex items-center space-x-6">
                        <div className="basis-1/2">
                          <button
                            onClick={() => {
                              setIsOnlineEvent(false);
                              setEventInfo((prev) => ({
                                ...prev,
                                location_type: 1,
                              }));
                            }}
                            className={` ${
                              !isOnlineEvent
                                ? "border border-primaryPurple bg-lightPurple text-primaryPurple"
                                : "border-lightText text-lightText bg-transparent"
                            } w-full hover:bg-lightPurple transition-all duration-300 ease-in-out h-12 border rounded-lg   flex items-center justify-center`}
                          >
                            <p>Venue</p>
                          </button>
                        </div>
                        <div className="basis-1/2">
                          <button
                            onClick={() => {
                              setIsOnlineEvent(true);
                              setEventInfo((prev) => ({
                                ...prev,
                                location_type: 2,
                              }));
                            }}
                            className={` ${
                              isOnlineEvent
                                ? "border border-primaryPurple bg-lightPurple text-primaryPurple"
                                : "border-lightText text-lightText bg-transparent"
                            }  w-full hover:bg-lightPurple transition-all duration-300 ease-in-out h-12 border rounded-lg   flex items-center justify-center`}
                          >
                            <p>Online Event</p>
                          </button>
                        </div>
                      </div>

                      {!isOnlineEvent && (
                        <GoogleLocationSearch
                          value={locationValue}
                          setValue={setLocationValue}
                          setEventInfo={setEventInfo}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Date and Time */}

                <div className="mt-8">
                  {!eventDetails.isEditEventDateAndTime ? (
                    <div className=" w-full py-5 border-[.3px] border-gray-300 px-6 shadow-lg rounded-md relative">
                      <div
                        onClick={() =>
                          setEventDetails((prev) => ({
                            ...prev,
                            isEditEventDateAndTime: true,
                          }))
                        }
                        className="absolute -top-3 -right-3 cursor-pointer hover:bg-primaryPurple hover:text-white w-12 h-12 rounded-full text-primaryPurple bg-lightPurple grid place-content-center"
                      >
                        <BiPencil />
                      </div>
                      <p className="font-semibold ">Date and time</p>
                      <div className="mt-4  flex items-center justify-between">
                        <div className="w-[45%]">
                          <p className="text-sm text-lightText">
                            Event start date
                          </p>
                          {/* <p>18th December 2023</p> */}
                          <p>{formatDate(eventInfo.start_date)}</p>
                        </div>
                        <div className="w-[45%]">
                          <p className="text-sm text-lightText">
                            Event start time
                          </p>
                          <p>{formatTime(eventInfo.start_date)}</p>
                        </div>
                      </div>
                      <div className="mt-4  flex items-center justify-between">
                        <div className="w-[45%]">
                          <p className="text-sm text-lightText">
                            Event end date
                          </p>
                          <p>{formatDate(eventInfo.end_date)}</p>
                        </div>
                        <div className="w-[45%]">
                          <p className="text-sm text-lightText">
                            Event end time
                          </p>
                          <p>{formatTime(eventInfo.end_date)}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-12 border-[2px] p-6 border-primaryPurple rounded-md">
                      <div className="flex items-center justify-between">
                        <h2 className="text-[24px] font-semibold">
                          Date and Time
                        </h2>
                        <div
                          onClick={() =>
                            setEventDetails((prev) => ({
                              ...prev,
                              isEditEventDateAndTime: false,
                            }))
                          }
                          className="text-2xl cursor-pointer text-gray-700 hover:text-gray-400"
                        >
                          <FaAngleDown />
                        </div>
                      </div>
                      <p className="text-gray-500 w-[70%] mt-2 mb-9">
                        Indicate the exact date and time your event will take
                        place, including the start and end time
                      </p>
                      <p className="text-sm mt-[36px] mb-6">
                        Think of a special event. It happens once and goes on
                        for many days
                      </p>
                      <div className="flex items-center space-x-6">
                        <div className="basis-1/2">
                          <label
                            className="text-sm mb-2 block text-gray-800"
                            htmlFor="organizerName"
                          >
                            Event start date{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div>
                            <DatePicker
                              className="outline-green-500"
                              onChange={setStartDate}
                              value={startDate}
                            />
                          </div>
                          {/* <input
                type="text"
                className="h-[56px] text-sm w-[338px] text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              /> */}
                        </div>
                        <div className="basis-1/2">
                          <label
                            className="text-sm mb-2 block text-gray-800"
                            htmlFor="organizerName"
                          >
                            Event start time{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div>
                            <TimePicker
                              onChange={setStartTime}
                              value={startTime}
                            />
                          </div>

                          {/* <input
                type="text"
                className="h-[56px] text-sm w-[338px] text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              /> */}
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 mt-6">
                        <div className="basis-1/2">
                          <label
                            className="text-sm block mb-2 text-gray-800"
                            htmlFor="organizerName"
                          >
                            Event end date{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div>
                            <DatePicker onChange={setEndDate} value={endDate} />
                          </div>
                          {/* <input
                type="text"
                className="h-[56px] text-sm w-[338px] text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              /> */}
                        </div>
                        <div className="basis-1/2">
                          <label
                            className="text-sm block mb-2 text-gray-800"
                            htmlFor="organizerName"
                          >
                            Event end time{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div>
                            <TimePicker onChange={setEndTime} value={endTime} />
                          </div>
                          {/* <input
                type="text"
                className="h-[56px] text-sm w-[338px] text-gray-600 px-3 mt-2 block bg-[#F8F8F8] rounded-lg outline-purple-600"
              /> */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Add FAQ */}
                <Faq
                  faqs={faqs}
                  setFaqs={setFaqs}
                  setEventInfo={setEventInfo}
                />
                <MainFooter
                  isComplete={isComplete2}
                  backHandler={backHandler}
                  nextHandler={nextHandlerTwo}
                />
              </section>
            ) : (
              <div>
                {isModalOpen && (
                  <AddTicketType
                    viewTicketIndex={viewTicketIndex}
                    setViewTicketIndex={setViewTicketIndex}
                    setIsModalOpen={setIsModalOpen}
                    tickets={tickets}
                    setTickets={setTickets}
                    setTicketInfo={setTicketInfo}
                    ticketInfo={ticketInfo}
                  />
                )}
                {isDeleteModalOpen && (
                  <ConfirmDeleteModal
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    deleteTicket={deleteTicketByIndex}
                  />
                )}
                <div className="mt-8 ">
                  <div className="w-full grid grid-cols-2 gap-6">
                    {tickets.map((item: any, i) => (
                      <div
                        key={i}
                        className="w-[94%] mx-auto  md:w-full p-6 border-[.1px] flex justify-between border-gray-300 px-6 shadow-md rounded-md"
                      >
                        <div className="flex space-x-4">
                          <div
                            className={`${
                              item.type === 1
                                ? "text-[#106BD5] bg-[#EDF4FC]"
                                : " text-[#CB1C6F] bg-[#FCEDF6]"
                            }  text-2xl  w-8 h-8 grid place-content-center rounded `}
                          >
                            {item.type === 1 ? (
                              <PiCreditCard />
                            ) : (
                              <MdAttachMoney />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-xl">
                              {item.type === 1 ? "Free" : "Paid"}
                            </p>
                            <p className="text-lightText">{item.name}</p>
                          </div>
                        </div>

                        <Menu
                          direction="left"
                          // arrow
                          menuButton={
                            <MenuButton style={{ background: "transparent" }}>
                              <div className="text-gray-800 text-xl h-11 w-11 rounded-full hover:bg-gray-100 grid place-content-center cursor-pointer">
                                <IoMdMore />
                              </div>
                            </MenuButton>
                          }
                          transition
                        >
                          {ticketOptions.map((d, index) => (
                            <MenuItem className="" key={d.title}>
                              <div
                                onClick={
                                  index === 0
                                    ? () => {
                                        setIsModalOpen(true);
                                        setViewTicketIndex(i);
                                        // viewTicketIndex !== null &&
                                        //   setTicketInfo(tickets[i]);
                                      }
                                    : () => {
                                        setDeleteTicketIndex(i);
                                        setIsDeleteModalOpen(true);
                                      }
                                }
                                className="flex items-center w-full space-x-3 py-1"
                              >
                                <div className="text-gray-500 text-lg">
                                  {d.icon}
                                </div>
                                <p className="text-lightText">{d.title}</p>
                              </div>
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
                    ))}
                  </div>
                  {/* Add Ticket Type */}
                  <div className="w-[94%] mx-auto md:w-full px-6 py-6 mt-9 border border-dashed border-gray-500 rounded-md">
                    <p className="font-semibold ">Add Ticket type</p>
                    <p className="text-lightText mt-3 mb-5 ">
                      Create Your Event Experience: Select Ticket Type and
                      Submit. You can add multiple ticket types
                    </p>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                      className="bg-lightPurple text-sm flex justify-center items-center space-x-1 text-primaryPurple h-10 w-full"
                    >
                      <GoPlus /> <p>Add Ticket type</p>
                    </button>
                  </div>
                </div>
                {createEvent?.isPending ? (
                  <MainFooter
                    title="Publish"
                    nextHandler={nextHandlerThree}
                    backHandler={backHandler}
                    isComplete={false}
                  />
                ) : (
                  <MainFooter
                    title="Publish"
                    nextHandler={nextHandlerThree}
                    backHandler={backHandler}
                    isComplete={isComplete3}
                  />
                )}
              </div>
            )}
          </>
        </main>
      </div>
    </section>
  );
};

export default CreateAndEditEvent;
