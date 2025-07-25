"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import Modal from "../utils/modal/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectAudio,
  selectAudioIsPlaying,
  selectIsMiniPlayerVisible,
  selectIsMainPlayerVisible,
  setIsPlaying,
  toggleIsPlaying,
} from "@/lib/store/audioSlice";
import Background from "../utils/Background";
import style from "./Player.module.css";
import clsx from "clsx";
import CircleArrowsIcon from "../svg/CircleArrowsIcon";
import DifferentDirectionArrows from "../svg/DifferentDirectionArrows";
import DublePlayIcon from "../svg/DublePlayIcon";
import PauseIcon from "../svg/PauseIcon";
import PlayIcon from "../svg/PlayIcon";
import VolumeIcon from "../svg/VolumeIcon";
import { parseDate } from "@/utils/parseDate";
import ListIcon from "../svg/ListIcon";
import { createPortal } from "react-dom";
import PlayerImage from "./PlayerImage";
import PlayerControls from "./PlayerControls";
import PlayerProgressBar from "./PlayerProgressBar";

type Position = {
  clientX: number;
  clientY: number;
};

export default function Player() {
  const audio = useAppSelector(selectAudio);
  const isPlaying = useAppSelector(selectAudioIsPlaying);
  const isMainPlayerVisible = useAppSelector(selectIsMainPlayerVisible);
  
  // Отладочные логи
  useEffect(() => {
     // console.log('Player visibility:', {
    //   audio: !!audio,
    //   isMainPlayerVisible,
    //   audioName: audio?.Name,
    //   isPlaying: audio ? isPlaying : null
    // });
  }, [audio, isMainPlayerVisible, isPlaying]);

  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    setModalRoot(modalRoot);
  }, []);

  const playerRef = useRef<HTMLDivElement>(null);

  const player = (
    <div className={clsx(style.modal)}>
      <div className={style.wrapper}>
        <div
          ref={playerRef}
          className={clsx(style.body, {
            "translate-y-[200%]": !isMainPlayerVisible
          })}
        >
         <PlayerImage audio={audio}></PlayerImage>
          <div className={clsx(style.right)}>
            <PlayerControls></PlayerControls>
            <PlayerProgressBar></PlayerProgressBar>
          </div>
        </div>
      </div>
    </div>
  );
  return modalRoot ? createPortal(player, modalRoot) : null;
}
