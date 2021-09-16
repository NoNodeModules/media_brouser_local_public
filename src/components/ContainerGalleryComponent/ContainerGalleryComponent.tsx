import React, {useState} from "react"
import LayoutContainerImg from "../../layouts/LayoutContainerImg/LayoutContainerImg";
import {Grid} from "@sanity/ui";
import SingleImgComponent from "../SingleImgComponent/SingleImgComponent";
import {
    ContentCard,
    Dispatch,
    InterfaceContentCard,
    OnDrop
} from "../ContainerMediaComponent/contentCard";
import EmptyContainerImgComponent from "../EmptyContainerImgComponent/EmptyContainerImgComponent";
import LayoutContainerDragAndDrop from "../../layouts/LayoutContainerDragAndDrop/LayoutContainerDragAndDrop";
import SingleFileDataComponent from "../SingleFileDataComponent/SingleFileDataComponent";
// @ts-ignore
import bigViewImg from "../../assets/pictures/bigViewImg.svg";
// @ts-ignore
import listViewImg from "../../assets/pictures/listViewImg.svg";
import GalleryToolsComponent from "../GalleryToolsComponent/GalleryToolsComponent";

type GalleryContainerComponentProps = {
    galleryArrayContentCard: InterfaceContentCard[];
    setGalleryArrayContentCard: Dispatch<InterfaceContentCard[]>;
    moveCard: (dragIndex: number, hoverIndex: number,
    arrayContentCard: InterfaceContentCard[], setArrayContentCard: Dispatch<InterfaceContentCard[]>) => void
    onDrop: OnDrop
    onUploadClick:(inputElement: React.MutableRefObject<HTMLInputElement>) => void;
    onSelectClick: () => void;
    statusViewGalleryProp: string;
    namePage: string,
}

const ContainerGalleryComponent: React.FunctionComponent<GalleryContainerComponentProps> = ({
    galleryArrayContentCard,
    setGalleryArrayContentCard,
    moveCard,
    onDrop,
    onUploadClick,
    onSelectClick,
    statusViewGalleryProp,
    namePage,
    }) =>
    {
    const statusEmptyBox = (galleryArrayContentCard && !galleryArrayContentCard.length) ?? false

    const [statusViewGallery, setStatusViewGallery] = useState(statusViewGalleryProp)

    const [statusCommonCheckBox, setStatusCommonCheckBox] = useState(false)

    const contentCardForHeaderListFiles = new ContentCard("header for list files", "File Name",
    "Preview", "Description", statusCommonCheckBox, "Type", "Dimension", "File size")

    const [statusDragAndDrop, setStatusDragAndDrop] = useState(true)

    const columnsForCards = statusViewGallery === "bigImg"? [3]: [1]

        return (
            <LayoutContainerImg
                headerName={"gallery img"}
                isEmpty={statusEmptyBox}
            >
                {!statusEmptyBox &&
                <>
                    {statusViewGallery === "listImg" && <SingleFileDataComponent
                        contentCard={contentCardForHeaderListFiles}
                        setArrayContentCard={setGalleryArrayContentCard}
                        arrayContentCard={galleryArrayContentCard}
                        setStatusCommonCheckBox={setStatusCommonCheckBox}
                        statusCommonCheckBox={statusCommonCheckBox}
                        namePage={namePage}
                    />}
                    <Grid className={"container-gallery-img"} columns={columnsForCards} gap={2}>
                        {galleryArrayContentCard?.map((contentCard: InterfaceContentCard, index: number)=>{
                            return(
                                <React.Fragment key={index}>
                                    {namePage === "img-gallery" && <LayoutContainerDragAndDrop
                                       contentCard={contentCard}
                                       setArrayContentCard={setGalleryArrayContentCard}
                                       arrayContentCard={galleryArrayContentCard}
                                       moveCard={moveCard}
                                       statusDragAndDrop={statusDragAndDrop}>
                                        {statusViewGallery === "bigImg" && <SingleImgComponent
                                            contentCard={contentCard}
                                            setArrayContentCard={setGalleryArrayContentCard}
                                            arrayContentCard={galleryArrayContentCard}
                                            type={"gallery"}
                                            onReplaceClick={onSelectClick}
                                        />}
                                        {statusViewGallery === "listImg" && <SingleFileDataComponent
                                            contentCard={contentCard}
                                            setArrayContentCard={setGalleryArrayContentCard}
                                            arrayContentCard={galleryArrayContentCard}
                                            setStatusCommonCheckBox={setStatusCommonCheckBox}
                                            statusCommonCheckBox={statusCommonCheckBox}
                                            setStatusDragAndDrop={setStatusDragAndDrop}
                                            namePage={namePage}
                                        />}
                                    </LayoutContainerDragAndDrop>}
                                    {statusViewGallery === "video-list" && <SingleFileDataComponent
                                        contentCard={contentCard}
                                        setArrayContentCard={setGalleryArrayContentCard}
                                        arrayContentCard={galleryArrayContentCard}
                                        setStatusCommonCheckBox={setStatusCommonCheckBox}
                                        statusCommonCheckBox={statusCommonCheckBox}
                                        setStatusDragAndDrop={setStatusDragAndDrop}
                                        namePage={namePage}
                                    />}
                                </React.Fragment>
                            )
                        })}
                    </Grid>
                    <GalleryToolsComponent
                        galleryArrayContentCard={galleryArrayContentCard}
                        setGalleryArrayContentCard={setGalleryArrayContentCard}
                        statusViewGallery={statusViewGallery}
                        setStatusViewGallery={setStatusViewGallery}
                        setStatusDragAndDrop={setStatusDragAndDrop}
                    />
                </>}
                {statusEmptyBox && <EmptyContainerImgComponent
                    onUploadClick={onUploadClick}
                    onSelectClick={onSelectClick}
                    setArrayContentCard={setGalleryArrayContentCard}
                    onDrop={onDrop}
                    typeArrayContentCard={"multiple"}
                />}
            </LayoutContainerImg>
    )
}

export default ContainerGalleryComponent