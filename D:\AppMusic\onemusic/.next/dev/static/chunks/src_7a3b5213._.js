(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/useAudioPlayer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAudioPlayer",
    ()=>useAudioPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useAudioPlayer(songs) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(63);
    if ($[0] !== "207ebda54f5faf2fa2d46f0a599dd447bc0b23833e806be79c2efaa7bb2dc8ab") {
        for(let $i = 0; $i < 63; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "207ebda54f5faf2fa2d46f0a599dd447bc0b23833e806be79c2efaa7bb2dc8ab";
    }
    const [currentSong, setCurrentSong] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [volume, setVolume] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [likedSongs, setLikedSongs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    const [playbackRate, setPlaybackRateState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isShuffle, setIsShuffle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [repeatMode, setRepeatMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playlistRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(songs);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "useAudioPlayer[setPlaylist]": (newPlaylist)=>{
                playlistRef.current = newPlaylist;
            }
        })["useAudioPlayer[setPlaylist]"];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const setPlaylist = t1;
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "useAudioPlayer[handleVolumeChange]": (newVolume)=>{
                const clamped = Math.max(0, Math.min(1, newVolume));
                setVolume(clamped);
                if (audioRef.current) {
                    audioRef.current.volume = clamped;
                    localStorage.setItem("volume", clamped.toString());
                }
            }
        })["useAudioPlayer[handleVolumeChange]"];
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const handleVolumeChange = t2;
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "useAudioPlayer[setPlaybackRate]": (rate)=>{
                setPlaybackRateState(rate);
                if (audioRef.current) {
                    audioRef.current.playbackRate = rate;
                }
            }
        })["useAudioPlayer[setPlaybackRate]"];
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const setPlaybackRate = t3;
    let t4;
    if ($[5] !== currentSong?.id || $[6] !== playbackRate) {
        t4 = ({
            "useAudioPlayer[playSong]": (song)=>{
                if (!audioRef.current) {
                    return;
                }
                if (currentSong?.id !== song.id) {
                    audioRef.current.src = song.src;
                    audioRef.current.playbackRate = playbackRate;
                    setCurrentSong(song);
                    localStorage.setItem("lastSongId", song.id.toString());
                }
                audioRef.current.play().then({
                    "useAudioPlayer[playSong > (anonymous)()]": ()=>setIsPlaying(true)
                }["useAudioPlayer[playSong > (anonymous)()]"]).catch(_useAudioPlayerPlaySongAnonymous);
            }
        })["useAudioPlayer[playSong]"];
        $[5] = currentSong?.id;
        $[6] = playbackRate;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    const playSong = t4;
    let t5;
    if ($[8] !== isPlaying || $[9] !== playbackRate) {
        t5 = ({
            "useAudioPlayer[togglePlay]": ()=>{
                if (!audioRef.current) {
                    return;
                }
                if (isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                } else {
                    audioRef.current.playbackRate = playbackRate;
                    audioRef.current.play().then({
                        "useAudioPlayer[togglePlay > (anonymous)()]": ()=>setIsPlaying(true)
                    }["useAudioPlayer[togglePlay > (anonymous)()]"]).catch(_useAudioPlayerTogglePlayAnonymous);
                }
            }
        })["useAudioPlayer[togglePlay]"];
        $[8] = isPlaying;
        $[9] = playbackRate;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    const togglePlay = t5;
    let t6;
    if ($[11] !== currentSong || $[12] !== isShuffle || $[13] !== playSong) {
        t6 = ({
            "useAudioPlayer[handleNext]": ()=>{
                if (!currentSong) {
                    return;
                }
                const currentList = playlistRef.current;
                if (currentList.length === 0) {
                    return;
                }
                let nextIndex;
                if (isShuffle) {
                    if (currentList.length === 1) {
                        nextIndex = 0;
                    } else {
                        do {
                            nextIndex = Math.floor(Math.random() * currentList.length);
                        }while (currentList[nextIndex].id === currentSong.id)
                    }
                } else {
                    const currentIndex = currentList.findIndex({
                        "useAudioPlayer[handleNext > currentList.findIndex()]": (s)=>s.id === currentSong.id
                    }["useAudioPlayer[handleNext > currentList.findIndex()]"]);
                    if (currentIndex === -1) {
                        nextIndex = 0;
                    } else {
                        nextIndex = (currentIndex + 1) % currentList.length;
                    }
                }
                playSong(currentList[nextIndex]);
            }
        })["useAudioPlayer[handleNext]"];
        $[11] = currentSong;
        $[12] = isShuffle;
        $[13] = playSong;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    const handleNext = t6;
    let t7;
    if ($[15] !== currentSong || $[16] !== playSong) {
        t7 = ({
            "useAudioPlayer[handlePrev]": ()=>{
                if (!currentSong) {
                    return;
                }
                const currentList_0 = playlistRef.current;
                if (currentList_0.length === 0) {
                    return;
                }
                const currentIndex_0 = currentList_0.findIndex({
                    "useAudioPlayer[handlePrev > currentList_0.findIndex()]": (s_0)=>s_0.id === currentSong.id
                }["useAudioPlayer[handlePrev > currentList_0.findIndex()]"]);
                if (audioRef.current && audioRef.current.currentTime > 3) {
                    audioRef.current.currentTime = 0;
                    setProgress(0);
                    return;
                }
                let prevIndex;
                if (currentIndex_0 === -1) {
                    prevIndex = 0;
                } else {
                    prevIndex = (currentIndex_0 - 1 + currentList_0.length) % currentList_0.length;
                }
                playSong(currentList_0[prevIndex]);
            }
        })["useAudioPlayer[handlePrev]"];
        $[15] = currentSong;
        $[16] = playSong;
        $[17] = t7;
    } else {
        t7 = $[17];
    }
    const handlePrev = t7;
    let t8;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = ({
            "useAudioPlayer[handleSeek]": (time)=>{
                if (audioRef.current) {
                    const clamped_0 = Math.max(0, Math.min(audioRef.current.duration || time, time));
                    audioRef.current.currentTime = clamped_0;
                    setProgress(clamped_0);
                }
            }
        })["useAudioPlayer[handleSeek]"];
        $[18] = t8;
    } else {
        t8 = $[18];
    }
    const handleSeek = t8;
    let t9;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = ({
            "useAudioPlayer[seekBy]": (seconds)=>{
                if (audioRef.current) {
                    const newTime = Math.max(0, Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds));
                    audioRef.current.currentTime = newTime;
                    setProgress(newTime);
                }
            }
        })["useAudioPlayer[seekBy]"];
        $[19] = t9;
    } else {
        t9 = $[19];
    }
    const seekBy = t9;
    let t10;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = ({
            "useAudioPlayer[toggleLike]": (songId)=>{
                setLikedSongs({
                    "useAudioPlayer[toggleLike > setLikedSongs()]": (prev)=>{
                        const newLiked = prev.includes(songId) ? prev.filter({
                            "useAudioPlayer[toggleLike > setLikedSongs() > prev.filter()]": (id)=>id !== songId
                        }["useAudioPlayer[toggleLike > setLikedSongs() > prev.filter()]"]) : [
                            ...prev,
                            songId
                        ];
                        localStorage.setItem("likedSongs", JSON.stringify(newLiked));
                        return newLiked;
                    }
                }["useAudioPlayer[toggleLike > setLikedSongs()]"]);
            }
        })["useAudioPlayer[toggleLike]"];
        $[20] = t10;
    } else {
        t10 = $[20];
    }
    const toggleLike = t10;
    let t11;
    if ($[21] !== isShuffle) {
        t11 = ({
            "useAudioPlayer[toggleShuffle]": ()=>setIsShuffle(!isShuffle)
        })["useAudioPlayer[toggleShuffle]"];
        $[21] = isShuffle;
        $[22] = t11;
    } else {
        t11 = $[22];
    }
    const toggleShuffle = t11;
    let t12;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = ({
            "useAudioPlayer[toggleRepeat]": ()=>{
                setRepeatMode(_useAudioPlayerToggleRepeatSetRepeatMode);
            }
        })["useAudioPlayer[toggleRepeat]"];
        $[23] = t12;
    } else {
        t12 = $[23];
    }
    const toggleRepeat = t12;
    let t13;
    let t14;
    if ($[24] !== songs) {
        t13 = ({
            "useAudioPlayer[useEffect()]": ()=>{
                audioRef.current = new Audio();
                setTimeout({
                    "useAudioPlayer[useEffect() > setTimeout()]": ()=>{
                        const savedVol = localStorage.getItem("volume");
                        if (savedVol) {
                            const vol = parseFloat(savedVol);
                            setVolume(vol);
                            if (audioRef.current) {
                                audioRef.current.volume = vol;
                            }
                        }
                        const savedLikes = localStorage.getItem("likedSongs");
                        if (savedLikes) {
                            ;
                            try {
                                setLikedSongs(JSON.parse(savedLikes));
                            } catch (t15) {
                                const e_1 = t15;
                                console.error(e_1);
                            }
                        }
                        const lastSongId = localStorage.getItem("lastSongId");
                        if (lastSongId) {
                            const foundSong = songs.find({
                                "useAudioPlayer[useEffect() > setTimeout() > songs.find()]": (s_1)=>s_1.id === parseInt(lastSongId)
                            }["useAudioPlayer[useEffect() > setTimeout() > songs.find()]"]);
                            if (foundSong) {
                                setCurrentSong(foundSong);
                                if (audioRef.current) {
                                    audioRef.current.src = foundSong.src;
                                }
                            }
                        }
                    }
                }["useAudioPlayer[useEffect() > setTimeout()]"], 0);
                return ()=>{
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current = null;
                    }
                };
            }
        })["useAudioPlayer[useEffect()]"];
        t14 = [
            songs
        ];
        $[24] = songs;
        $[25] = t13;
        $[26] = t14;
    } else {
        t13 = $[25];
        t14 = $[26];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t13, t14);
    let t15;
    let t16;
    if ($[27] !== handleNext || $[28] !== isShuffle || $[29] !== repeatMode) {
        t15 = ({
            "useAudioPlayer[useEffect()]": ()=>{
                const audio = audioRef.current;
                if (!audio) {
                    return;
                }
                const updateTime = {
                    "useAudioPlayer[useEffect() > updateTime]": ()=>{
                        setProgress(audio.currentTime);
                        setDuration(audio.duration || 0);
                    }
                }["useAudioPlayer[useEffect() > updateTime]"];
                const onEnded = {
                    "useAudioPlayer[useEffect() > onEnded]": ()=>{
                        if (repeatMode === "one") {
                            audio.currentTime = 0;
                            audio.play();
                        } else {
                            if (repeatMode === "all" || isShuffle) {
                                handleNext();
                            } else {
                                setIsPlaying(false);
                            }
                        }
                    }
                }["useAudioPlayer[useEffect() > onEnded]"];
                audio.addEventListener("timeupdate", updateTime);
                audio.addEventListener("ended", onEnded);
                return ()=>{
                    audio.removeEventListener("timeupdate", updateTime);
                    audio.removeEventListener("ended", onEnded);
                };
            }
        })["useAudioPlayer[useEffect()]"];
        t16 = [
            handleNext,
            repeatMode,
            isShuffle
        ];
        $[27] = handleNext;
        $[28] = isShuffle;
        $[29] = repeatMode;
        $[30] = t15;
        $[31] = t16;
    } else {
        t15 = $[30];
        t16 = $[31];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t15, t16);
    let t17;
    let t18;
    if ($[32] !== currentSong || $[33] !== handleNext || $[34] !== handlePrev || $[35] !== isPlaying || $[36] !== togglePlay) {
        t17 = ({
            "useAudioPlayer[useEffect()]": ()=>{
                if (("TURBOPACK compile-time value", "object") === "undefined" || !("mediaSession" in navigator)) {
                    return;
                }
                if (currentSong) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: currentSong.title,
                        artist: currentSong.artist,
                        album: currentSong.genre || "OneMusic",
                        artwork: [
                            {
                                src: currentSong.cover,
                                sizes: "96x96",
                                type: "image/jpeg"
                            },
                            {
                                src: currentSong.cover,
                                sizes: "128x128",
                                type: "image/jpeg"
                            },
                            {
                                src: currentSong.cover,
                                sizes: "256x256",
                                type: "image/jpeg"
                            },
                            {
                                src: currentSong.cover,
                                sizes: "512x512",
                                type: "image/jpeg"
                            }
                        ]
                    });
                    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
                }
                ;
                try {
                    navigator.mediaSession.setActionHandler("play", {
                        "useAudioPlayer[useEffect() > navigator.mediaSession.setActionHandler()]": ()=>{
                            if (!isPlaying) {
                                togglePlay();
                            }
                        }
                    }["useAudioPlayer[useEffect() > navigator.mediaSession.setActionHandler()]"]);
                    navigator.mediaSession.setActionHandler("pause", {
                        "useAudioPlayer[useEffect() > navigator.mediaSession.setActionHandler()]": ()=>{
                            if (isPlaying) {
                                togglePlay();
                            }
                        }
                    }["useAudioPlayer[useEffect() > navigator.mediaSession.setActionHandler()]"]);
                    navigator.mediaSession.setActionHandler("previoustrack", handlePrev);
                    navigator.mediaSession.setActionHandler("nexttrack", handleNext);
                    navigator.mediaSession.setActionHandler("seekto", {
                        "useAudioPlayer[useEffect() > navigator.mediaSession.setActionHandler()]": (details)=>{
                            if (details.seekTime !== undefined) {
                                handleSeek(details.seekTime);
                            }
                        }
                    }["useAudioPlayer[useEffect() > navigator.mediaSession.setActionHandler()]"]);
                    navigator.mediaSession.setActionHandler("seekbackward", {
                        "useAudioPlayer[useEffect() > navigator.mediaSession.setActionHandler()]": ()=>seekBy(-5)
                    }["useAudioPlayer[useEffect() > navigator.mediaSession.setActionHandler()]"]);
                    navigator.mediaSession.setActionHandler("seekforward", {
                        "useAudioPlayer[useEffect() > navigator.mediaSession.setActionHandler()]": ()=>seekBy(5)
                    }["useAudioPlayer[useEffect() > navigator.mediaSession.setActionHandler()]"]);
                } catch (t19) {
                    const e_2 = t19;
                    console.warn("MediaSession handler error:", e_2);
                }
            }
        })["useAudioPlayer[useEffect()]"];
        t18 = [
            currentSong,
            isPlaying,
            togglePlay,
            handlePrev,
            handleNext
        ];
        $[32] = currentSong;
        $[33] = handleNext;
        $[34] = handlePrev;
        $[35] = isPlaying;
        $[36] = togglePlay;
        $[37] = t17;
        $[38] = t18;
    } else {
        t17 = $[37];
        t18 = $[38];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t17, t18);
    let t19;
    let t20;
    if ($[39] !== handleNext || $[40] !== handlePrev || $[41] !== togglePlay) {
        t19 = ({
            "useAudioPlayer[useEffect()]": ()=>{
                const handleKeyDown = {
                    "useAudioPlayer[useEffect() > handleKeyDown]": (e_3)=>{
                        if (e_3.target.tagName === "INPUT" || e_3.target.tagName === "TEXTAREA") {
                            return;
                        }
                        const audio_0 = audioRef.current;
                        if (!audio_0) {
                            return;
                        }
                        bb246: switch(e_3.code){
                            case "Space":
                                {
                                    e_3.preventDefault();
                                    togglePlay();
                                    break bb246;
                                }
                            case "ArrowRight":
                                {
                                    e_3.preventDefault();
                                    handleNext();
                                    break bb246;
                                }
                            case "ArrowLeft":
                                {
                                    e_3.preventDefault();
                                    handlePrev();
                                    break bb246;
                                }
                            case "KeyL":
                                {
                                    seekBy(5);
                                    break bb246;
                                }
                            case "KeyJ":
                                {
                                    seekBy(-5);
                                    break bb246;
                                }
                            case "KeyM":
                                {
                                    handleVolumeChange(audio_0.volume > 0 ? 0 : 1);
                                    break bb246;
                                }
                            case "ArrowUp":
                                {
                                    e_3.preventDefault();
                                    handleVolumeChange(Math.min(audio_0.volume + 0.05, 1));
                                    break bb246;
                                }
                            case "ArrowDown":
                                {
                                    e_3.preventDefault();
                                    handleVolumeChange(Math.max(audio_0.volume - 0.05, 0));
                                }
                        }
                    }
                }["useAudioPlayer[useEffect() > handleKeyDown]"];
                window.addEventListener("keydown", handleKeyDown);
                return ()=>window.removeEventListener("keydown", handleKeyDown);
            }
        })["useAudioPlayer[useEffect()]"];
        t20 = [
            handleVolumeChange,
            handleNext,
            handlePrev,
            togglePlay
        ];
        $[39] = handleNext;
        $[40] = handlePrev;
        $[41] = togglePlay;
        $[42] = t19;
        $[43] = t20;
    } else {
        t19 = $[42];
        t20 = $[43];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t19, t20);
    let t21;
    let t22;
    if ($[44] !== currentSong || $[45] !== isPlaying) {
        t21 = ({
            "useAudioPlayer[useEffect()]": ()=>{
                if (currentSong) {
                    document.title = isPlaying ? `▶ ${currentSong.title} • ${currentSong.artist}` : `${currentSong.title} • ${currentSong.artist}`;
                } else {
                    document.title = "One Music - Premium Web Player";
                }
            }
        })["useAudioPlayer[useEffect()]"];
        t22 = [
            currentSong,
            isPlaying
        ];
        $[44] = currentSong;
        $[45] = isPlaying;
        $[46] = t21;
        $[47] = t22;
    } else {
        t21 = $[46];
        t22 = $[47];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t21, t22);
    let t23;
    if ($[48] !== currentSong || $[49] !== duration || $[50] !== handleNext || $[51] !== handlePrev || $[52] !== isPlaying || $[53] !== isShuffle || $[54] !== likedSongs || $[55] !== playSong || $[56] !== playbackRate || $[57] !== progress || $[58] !== repeatMode || $[59] !== togglePlay || $[60] !== toggleShuffle || $[61] !== volume) {
        t23 = {
            currentSong,
            isPlaying,
            progress,
            duration,
            volume,
            likedSongs,
            isShuffle,
            repeatMode,
            playbackRate,
            setPlaybackRate,
            seekBy,
            playSong,
            togglePlay,
            handleNext,
            handlePrev,
            handleSeek,
            handleVolumeChange,
            toggleLike,
            toggleShuffle,
            toggleRepeat,
            setPlaylist
        };
        $[48] = currentSong;
        $[49] = duration;
        $[50] = handleNext;
        $[51] = handlePrev;
        $[52] = isPlaying;
        $[53] = isShuffle;
        $[54] = likedSongs;
        $[55] = playSong;
        $[56] = playbackRate;
        $[57] = progress;
        $[58] = repeatMode;
        $[59] = togglePlay;
        $[60] = toggleShuffle;
        $[61] = volume;
        $[62] = t23;
    } else {
        t23 = $[62];
    }
    return t23;
}
_s(useAudioPlayer, "hJHM6PSqfxOBc79/TG+wn1EZRwI=");
function _useAudioPlayerToggleRepeatSetRepeatMode(prev_0) {
    if (prev_0 === "off") {
        return "all";
    }
    if (prev_0 === "all") {
        return "one";
    }
    return "off";
}
function _useAudioPlayerTogglePlayAnonymous(e_0) {
    return console.error("Playback error:", e_0);
}
function _useAudioPlayerPlaySongAnonymous(e) {
    return console.error("Playback error:", e);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/KeyboardShortcutsModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KeyboardShortcutsModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
;
;
const shortcuts = [
    {
        key: "Space",
        desc: "Play / Pause lagu"
    },
    {
        key: "← / →",
        desc: "Lagu sebelumnya / Lagu berikutnya"
    },
    {
        key: "J / L",
        desc: "Mundur 5 detik / Maju 5 detik"
    },
    {
        key: "↑ / ↓",
        desc: "Naikkan / Turunkan volume"
    },
    {
        key: "M",
        desc: "Mute / Unmute audio"
    },
    {
        key: "?",
        desc: "Buka / Tutup panduan shortcut ini"
    }
];
function KeyboardShortcutsModal(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "2814ac7ea377e5f4d7a0f45f7f88148c1c5bb73528defe8b81452ef58a68c7a9") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2814ac7ea377e5f4d7a0f45f7f88148c1c5bb73528defe8b81452ef58a68c7a9";
    }
    const { isOpen, onClose } = t0;
    let t1;
    if ($[1] !== isOpen || $[2] !== onClose) {
        t1 = isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-110 flex items-center justify-center p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: onClose,
                    className: "absolute inset-0 bg-black/70 backdrop-blur-md"
                }, void 0, false, {
                    fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                    lineNumber: 41,
                    columnNumber: 94
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        scale: 0.9,
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        scale: 1,
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        scale: 0.9,
                        opacity: 0,
                        y: 20
                    },
                    transition: {
                        type: "spring",
                        damping: 25,
                        stiffness: 300
                    },
                    className: "relative z-10 w-full max-w-md bg-[#121216] border border-white/15 rounded-3xl p-6 shadow-2xl text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between pb-4 border-b border-white/10 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-lg bg-[#22c527]/20 border border-[#22c527]/40 flex items-center justify-center text-[#22c527]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "ri-keyboard-line text-lg"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                                                lineNumber: 63,
                                                columnNumber: 382
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                                            lineNumber: 63,
                                            columnNumber: 255
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-base",
                                                    children: "Keyboard Shortcuts"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                                                    lineNumber: 63,
                                                    columnNumber: 435
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-white/50",
                                                    children: "Kontrol musik lebih cepat via keyboard"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                                                    lineNumber: 63,
                                                    columnNumber: 494
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                                            lineNumber: 63,
                                            columnNumber: 430
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                                    lineNumber: 63,
                                    columnNumber: 212
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "ri-close-line text-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                                        lineNumber: 63,
                                        columnNumber: 748
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                                    lineNumber: 63,
                                    columnNumber: 585
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                            lineNumber: 63,
                            columnNumber: 126
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: shortcuts.map(_KeyboardShortcutsModalShortcutsMap)
                        }, void 0, false, {
                            fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                            lineNumber: 63,
                            columnNumber: 802
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 pt-4 border-t border-white/10 text-center text-xs text-white/40",
                            children: [
                                "Tekan tombol ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                    className: "px-1.5 py-0.5 rounded bg-white/10 text-white/70",
                                    children: "Esc"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                                    lineNumber: 63,
                                    columnNumber: 986
                                }, this),
                                " untuk menutup"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                            lineNumber: 63,
                            columnNumber: 887
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                    lineNumber: 47,
                    columnNumber: 88
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
            lineNumber: 41,
            columnNumber: 20
        }, this);
        $[1] = isOpen;
        $[2] = onClose;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t1
        }, void 0, false, {
            fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
            lineNumber: 72,
            columnNumber: 10
        }, this);
        $[4] = t1;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    return t2;
}
_c = KeyboardShortcutsModal;
function _KeyboardShortcutsModalShortcutsMap(s, idx) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between py-2 px-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/6 transition",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm text-white/80",
                children: s.desc
            }, void 0, false, {
                fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                lineNumber: 81,
                columnNumber: 153
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                className: "px-2.5 py-1 text-xs font-mono font-semibold bg-white/10 text-[#22c527] border border-white/15 rounded-lg shadow-inner",
                children: s.key
            }, void 0, false, {
                fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
                lineNumber: 81,
                columnNumber: 208
            }, this)
        ]
    }, idx, true, {
        fileName: "[project]/src/components/KeyboardShortcutsModal.tsx",
        lineNumber: 81,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "KeyboardShortcutsModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KeyboardShortcutsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/KeyboardShortcutsModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Header(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(36);
    if ($[0] !== "39d7ff4d16c3dc035dc756ba4b0d21b2bc54370d9d50ccc56e05652c8b33afc0") {
        for(let $i = 0; $i < 36; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "39d7ff4d16c3dc035dc756ba4b0d21b2bc54370d9d50ccc56e05652c8b33afc0";
    }
    const { searchTerm, setSearchTerm, totalSongsCount: t1 } = t0;
    const totalSongsCount = t1 === undefined ? 0 : t1;
    const [isShortcutOpen, setIsShortcutOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const getGreeting = _HeaderGetGreeting;
    let t2;
    let t3;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "Header[useEffect()]": ()=>{
                const handleKey = {
                    "Header[useEffect() > handleKey]": (e)=>{
                        if (e.target.tagName === "INPUT") {
                            return;
                        }
                        if (e.key === "?" || e.shiftKey && e.key === "/") {
                            setIsShortcutOpen(_HeaderUseEffectHandleKeySetIsShortcutOpen);
                        } else {
                            if (e.key === "Escape") {
                                setIsShortcutOpen(false);
                            }
                        }
                    }
                }["Header[useEffect() > handleKey]"];
                window.addEventListener("keydown", handleKey);
                return ()=>window.removeEventListener("keydown", handleKey);
            }
        })["Header[useEffect()]"];
        t3 = [];
        $[1] = t2;
        $[2] = t3;
    } else {
        t2 = $[1];
        t3 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-10 h-10 rounded-2xl bg-linear-to-br from-[#22c527] to-emerald-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,39,0.35)] shrink-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "ri-disc-fill text-2xl text-black animate-spin-slow"
            }, void 0, false, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 58,
                columnNumber: 176
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 58,
            columnNumber: 10
        }, this);
        $[3] = t4;
    } else {
        t4 = $[3];
    }
    let t5;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-xl md:text-2xl font-black tracking-tight text-white flex items-center",
            children: [
                "One",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[#22c527]",
                    children: "Music"
                }, void 0, false, {
                    fileName: "[project]/src/components/Header.tsx",
                    lineNumber: 65,
                    columnNumber: 104
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 65,
            columnNumber: 10
        }, this);
        $[4] = t5;
    } else {
        t5 = $[4];
    }
    let t6;
    if ($[5] !== totalSongsCount) {
        t6 = totalSongsCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold text-white/60 tracking-wider",
            children: [
                totalSongsCount,
                " SONGS"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 72,
            columnNumber: 33
        }, this);
        $[5] = totalSongsCount;
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    let t7;
    if ($[7] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 80,
            columnNumber: 10
        }, this);
        $[7] = t6;
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    let t8;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-white/40 text-[11px] font-medium hidden sm:block",
            children: [
                getGreeting(),
                " • Enjoy your sound"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 88,
            columnNumber: 10
        }, this);
        $[9] = t8;
    } else {
        t8 = $[9];
    }
    let t9;
    if ($[10] !== t7) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: [
                t4,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        t7,
                        t8
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Header.tsx",
                    lineNumber: 95,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 95,
            columnNumber: 10
        }, this);
        $[10] = t7;
        $[11] = t9;
    } else {
        t9 = $[11];
    }
    let t10;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "ri-search-2-line text-white/40 text-base group-focus-within:text-[#22c527] transition-colors"
            }, void 0, false, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 103,
                columnNumber: 104
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 103,
            columnNumber: 11
        }, this);
        $[12] = t10;
    } else {
        t10 = $[12];
    }
    let t11;
    if ($[13] !== setSearchTerm) {
        t11 = ({
            "Header[<input>.onChange]": (e_0)=>setSearchTerm(e_0.target.value)
        })["Header[<input>.onChange]"];
        $[13] = setSearchTerm;
        $[14] = t11;
    } else {
        t11 = $[14];
    }
    let t12;
    if ($[15] !== searchTerm || $[16] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            placeholder: "Cari lagu, musisi, atau genre...",
            value: searchTerm,
            onChange: t11,
            className: "w-full bg-white/6 hover:bg-white/9 focus:bg-white/12 border border-white/10 focus:border-[#22c527]/50 rounded-2xl py-2.5 pl-10 pr-10 text-xs md:text-sm text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#22c527]/20 transition-all shadow-inner"
        }, void 0, false, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 120,
            columnNumber: 11
        }, this);
        $[15] = searchTerm;
        $[16] = t11;
        $[17] = t12;
    } else {
        t12 = $[17];
    }
    let t13;
    if ($[18] !== searchTerm || $[19] !== setSearchTerm) {
        t13 = searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: {
                "Header[<button>.onClick]": ()=>setSearchTerm("")
            }["Header[<button>.onClick]"],
            className: "absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white transition",
            title: "Hapus pencarian",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "ri-close-circle-fill text-base"
            }, void 0, false, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 131,
                columnNumber: 164
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 129,
            columnNumber: 25
        }, this);
        $[18] = searchTerm;
        $[19] = setSearchTerm;
        $[20] = t13;
    } else {
        t13 = $[20];
    }
    let t14;
    if ($[21] !== t12 || $[22] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 max-w-md relative group",
            children: [
                t10,
                t12,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 140,
            columnNumber: 11
        }, this);
        $[21] = t12;
        $[22] = t13;
        $[23] = t14;
    } else {
        t14 = $[23];
    }
    let t15;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = ({
            "Header[<button>.onClick]": ()=>setIsShortcutOpen(true)
        })["Header[<button>.onClick]"];
        $[24] = t15;
    } else {
        t15 = $[24];
    }
    let t16;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t15,
            className: "w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition shadow-sm",
            title: "Keyboard Shortcuts (tekan '?')",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "ri-keyboard-line text-base md:text-lg"
            }, void 0, false, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 158,
                columnNumber: 257
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 158,
            columnNumber: 11
        }, this);
        $[25] = t16;
    } else {
        t16 = $[25];
    }
    let t17;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 md:gap-3",
            children: [
                t16,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "https://github.com/wannn-sion95/Web-Music",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-linear-to-tr from-[#22c527] to-cyan-500 p-0.5 cursor-pointer hover:scale-105 active:scale-95 transition shadow-lg shadow-[#22c527]/10",
                    title: "GitHub Repository",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full rounded-[14px] bg-[#09090b] flex items-center justify-center overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "ri-github-fill text-lg text-white"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Header.tsx",
                            lineNumber: 165,
                            columnNumber: 479
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 165,
                        columnNumber: 371
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Header.tsx",
                    lineNumber: 165,
                    columnNumber: 66
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 165,
            columnNumber: 11
        }, this);
        $[26] = t17;
    } else {
        t17 = $[26];
    }
    let t18;
    if ($[27] !== t14 || $[28] !== t9) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-none p-4 md:p-6 md:pt-8 z-30 sticky top-0 backdrop-blur-xl bg-[#09090b]/80 border-b border-white/5 transition-all",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6",
                children: [
                    t9,
                    t14,
                    t17
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 172,
                columnNumber: 147
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 172,
            columnNumber: 11
        }, this);
        $[27] = t14;
        $[28] = t9;
        $[29] = t18;
    } else {
        t18 = $[29];
    }
    let t19;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = ({
            "Header[<KeyboardShortcutsModal>.onClose]": ()=>setIsShortcutOpen(false)
        })["Header[<KeyboardShortcutsModal>.onClose]"];
        $[30] = t19;
    } else {
        t19 = $[30];
    }
    let t20;
    if ($[31] !== isShortcutOpen) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$KeyboardShortcutsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            isOpen: isShortcutOpen,
            onClose: t19
        }, void 0, false, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 190,
            columnNumber: 11
        }, this);
        $[31] = isShortcutOpen;
        $[32] = t20;
    } else {
        t20 = $[32];
    }
    let t21;
    if ($[33] !== t18 || $[34] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t18,
                t20
            ]
        }, void 0, true);
        $[33] = t18;
        $[34] = t20;
        $[35] = t21;
    } else {
        t21 = $[35];
    }
    return t21;
}
_s(Header, "AuNPcw7MpXGljh/q/KF8KPMRDNE=");
_c = Header;
function _HeaderUseEffectHandleKeySetIsShortcutOpen(prev) {
    return !prev;
}
function _HeaderGetGreeting() {
    const hour = new Date().getHours();
    if (hour < 4) {
        return "Good Night";
    }
    if (hour < 12) {
        return "Good Morning";
    }
    if (hour < 18) {
        return "Good Afternoon";
    }
    return "Good Evening";
}
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HeroCarousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
/* eslint-disable @next/next/no-img-element */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function HeroCarousel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(24);
    if ($[0] !== "2b3955d1554138485e899587906924c5d4c27ef5155151dd7fd2c2a7c6f43767") {
        for(let $i = 0; $i < 24; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2b3955d1554138485e899587906924c5d4c27ef5155151dd7fd2c2a7c6f43767";
    }
    const { songs, currentSong, isPlaying, onPlay, onTogglePlay } = t0;
    const featuredSongs = songs.slice(0, 6);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroCarousel[useEffect()]": {
            "HeroCarousel.useEffect": ()=>{
                if (featuredSongs.length === 0) {
                    return;
                }
                const timer = setInterval({
                    "HeroCarousel[useEffect() > setInterval()]": {
                        "HeroCarousel.useEffect.timer": ()=>{
                            setCurrentIndex({
                                "HeroCarousel[useEffect() > setInterval() > setCurrentIndex()]": {
                                    "HeroCarousel.useEffect.timer": (prev)=>(prev + 1) % featuredSongs.length
                                }["HeroCarousel.useEffect.timer"]
                            }["HeroCarousel[useEffect() > setInterval() > setCurrentIndex()]"]);
                        }
                    }["HeroCarousel.useEffect.timer"]
                }["HeroCarousel[useEffect() > setInterval()]"], 6000);
                return ({
                    "HeroCarousel.useEffect": ()=>clearInterval(timer)
                })["HeroCarousel.useEffect"];
            }
        }["HeroCarousel.useEffect"]
    }["HeroCarousel[useEffect()]"], [
        featuredSongs.length
    ]);
    if (featuredSongs.length === 0) {
        return null;
    }
    const currentFeatured = featuredSongs[currentIndex];
    const isThisSongActive = currentSong?.id === currentFeatured.id;
    const handlePlayClick = {
        "HeroCarousel[handlePlayClick]": ()=>{
            if (isThisSongActive) {
                onTogglePlay();
            } else {
                onPlay(currentFeatured);
            }
        }
    }["HeroCarousel[handlePlayClick]"];
    let t1;
    let t2;
    let t3;
    let t4;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            opacity: 0,
            scale: 1.08
        };
        t2 = {
            opacity: 1,
            scale: 1
        };
        t3 = {
            opacity: 0
        };
        t4 = {
            duration: 0.6
        };
        $[1] = t1;
        $[2] = t2;
        $[3] = t3;
        $[4] = t4;
    } else {
        t1 = $[1];
        t2 = $[2];
        t3 = $[3];
        t4 = $[4];
    }
    let t5;
    let t6;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-linear-to-r from-black/95 via-black/60 to-transparent"
        }, void 0, false, {
            fileName: "[project]/src/components/HeroCarousel.tsx",
            lineNumber: 91,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"
        }, void 0, false, {
            fileName: "[project]/src/components/HeroCarousel.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[5] = t5;
        $[6] = t6;
    } else {
        t5 = $[5];
        t6 = $[6];
    }
    let t7;
    let t8;
    let t9;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = {
            opacity: 0,
            y: 15
        };
        t8 = {
            opacity: 1,
            y: 0
        };
        t9 = {
            delay: 0.15,
            duration: 0.4
        };
        $[7] = t7;
        $[8] = t8;
        $[9] = t9;
    } else {
        t7 = $[7];
        t8 = $[8];
        t9 = $[9];
    }
    let t10;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22c527] text-black text-[11px] font-extrabold tracking-widest uppercase shadow-[0_0_15px_rgba(34,197,39,0.5)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "ri-fire-fill"
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel.tsx",
                    lineNumber: 125,
                    columnNumber: 200
                }, this),
                " Trending Now"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/HeroCarousel.tsx",
            lineNumber: 125,
            columnNumber: 11
        }, this);
        $[10] = t10;
    } else {
        t10 = $[10];
    }
    const t11 = `${isThisSongActive && isPlaying ? "ri-pause-fill" : "ri-play-fill"} text-base`;
    let t12;
    if ($[11] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: t11
        }, void 0, false, {
            fileName: "[project]/src/components/HeroCarousel.tsx",
            lineNumber: 133,
            columnNumber: 11
        }, this);
        $[11] = t11;
        $[12] = t12;
    } else {
        t12 = $[12];
    }
    const t13 = isThisSongActive && isPlaying ? "Jeda" : "Dengarkan Sekarang";
    let t14;
    if ($[13] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t13
        }, void 0, false, {
            fileName: "[project]/src/components/HeroCarousel.tsx",
            lineNumber: 142,
            columnNumber: 11
        }, this);
        $[13] = t13;
        $[14] = t14;
    } else {
        t14 = $[14];
    }
    let t15;
    if ($[15] !== isPlaying || $[16] !== isThisSongActive) {
        t15 = isThisSongActive && isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-1 bg-[#22c527] rounded-full animate-music-bar-1 h-3"
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel.tsx",
                    lineNumber: 150,
                    columnNumber: 160
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-1 bg-[#22c527] rounded-full animate-music-bar-2 h-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel.tsx",
                    lineNumber: 150,
                    columnNumber: 234
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-1 bg-[#22c527] rounded-full animate-music-bar-3 h-2"
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel.tsx",
                    lineNumber: 150,
                    columnNumber: 308
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[11px] font-bold text-white/80 ml-1",
                    children: "Playing"
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroCarousel.tsx",
                    lineNumber: 150,
                    columnNumber: 382
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/HeroCarousel.tsx",
            lineNumber: 150,
            columnNumber: 44
        }, this);
        $[15] = isPlaying;
        $[16] = isThisSongActive;
        $[17] = t15;
    } else {
        t15 = $[17];
    }
    let t16;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: "ri-arrow-left-s-line text-2xl"
        }, void 0, false, {
            fileName: "[project]/src/components/HeroCarousel.tsx",
            lineNumber: 159,
            columnNumber: 11
        }, this);
        $[18] = t16;
    } else {
        t16 = $[18];
    }
    let t17;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: "ri-arrow-right-s-line text-2xl"
        }, void 0, false, {
            fileName: "[project]/src/components/HeroCarousel.tsx",
            lineNumber: 166,
            columnNumber: 11
        }, this);
        $[19] = t17;
    } else {
        t17 = $[19];
    }
    const t18 = "absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5";
    let t19;
    if ($[20] !== currentIndex) {
        t19 = ({
            "HeroCarousel[featuredSongs.map()]": (_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "HeroCarousel[featuredSongs.map() > <button>.onClick]": ()=>setCurrentIndex(idx)
                    }["HeroCarousel[featuredSongs.map() > <button>.onClick]"],
                    className: `h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? "w-6 bg-[#22c527]" : "w-2 bg-white/30 hover:bg-white/60"}`
                }, idx, false, {
                    fileName: "[project]/src/components/HeroCarousel.tsx",
                    lineNumber: 175,
                    columnNumber: 56
                }, this)
        })["HeroCarousel[featuredSongs.map()]"];
        $[20] = currentIndex;
        $[21] = t19;
    } else {
        t19 = $[21];
    }
    const t20 = featuredSongs.map(t19);
    let t21;
    if ($[22] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t18,
            children: t20
        }, void 0, false, {
            fileName: "[project]/src/components/HeroCarousel.tsx",
            lineNumber: 187,
            columnNumber: 11
        }, this);
        $[22] = t20;
        $[23] = t21;
    } else {
        t21 = $[23];
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-64 md:h-80 mb-8 group select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full h-full rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl border border-white/10 bg-[#121215]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        mode: "wait",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: t1,
                            animate: t2,
                            exit: t3,
                            transition: t4,
                            className: "absolute inset-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: currentFeatured.cover,
                                    alt: currentFeatured.title,
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel.tsx",
                                    lineNumber: 193,
                                    columnNumber: 356
                                }, this),
                                t5,
                                t6
                            ]
                        }, currentFeatured.id, true, {
                            fileName: "[project]/src/components/HeroCarousel.tsx",
                            lineNumber: 193,
                            columnNumber: 238
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroCarousel.tsx",
                        lineNumber: 193,
                        columnNumber: 209
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex flex-col justify-center px-6 md:px-14 z-10 max-w-2xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: t7,
                            animate: t8,
                            transition: t9,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-3",
                                    children: [
                                        t10,
                                        currentFeatured.genre && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-medium",
                                            children: currentFeatured.genre
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HeroCarousel.tsx",
                                            lineNumber: 193,
                                            columnNumber: 755
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HeroCarousel.tsx",
                                    lineNumber: 193,
                                    columnNumber: 678
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl sm:text-3xl md:text-5xl font-black text-white mb-1.5 tracking-tight leading-tight drop-shadow-lg line-clamp-1",
                                    children: currentFeatured.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel.tsx",
                                    lineNumber: 193,
                                    columnNumber: 924
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/80 text-sm sm:text-lg md:text-xl font-medium mb-6",
                                    children: currentFeatured.artist
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HeroCarousel.tsx",
                                    lineNumber: 193,
                                    columnNumber: 1087
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handlePlayClick,
                                            className: "px-5 py-2.5 bg-[#22c527] hover:bg-[#1fbe24] text-black font-extrabold rounded-full transition transform hover:scale-105 active:scale-95 flex items-center gap-2.5 shadow-[0_0_25px_rgba(34,197,39,0.4)] text-xs md:text-sm cursor-pointer",
                                            children: [
                                                t12,
                                                t14
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/HeroCarousel.tsx",
                                            lineNumber: 193,
                                            columnNumber: 1232
                                        }, this),
                                        t15
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HeroCarousel.tsx",
                                    lineNumber: 193,
                                    columnNumber: 1191
                                }, this)
                            ]
                        }, `text-${currentFeatured.id}`, true, {
                            fileName: "[project]/src/components/HeroCarousel.tsx",
                            lineNumber: 193,
                            columnNumber: 589
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroCarousel.tsx",
                        lineNumber: 193,
                        columnNumber: 497
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HeroCarousel.tsx",
                lineNumber: 193,
                columnNumber: 79
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: {
                    "HeroCarousel[<button>.onClick]": ()=>setCurrentIndex({
                            "HeroCarousel[<button>.onClick > setCurrentIndex()]": (prev_0)=>(prev_0 - 1 + featuredSongs.length) % featuredSongs.length
                        }["HeroCarousel[<button>.onClick > setCurrentIndex()]"])
                }["HeroCarousel[<button>.onClick]"],
                className: "absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 z-20 cursor-pointer",
                title: "Sebelumnya",
                children: t16
            }, void 0, false, {
                fileName: "[project]/src/components/HeroCarousel.tsx",
                lineNumber: 193,
                columnNumber: 1567
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: {
                    "HeroCarousel[<button>.onClick]": ()=>setCurrentIndex({
                            "HeroCarousel[<button>.onClick > setCurrentIndex()]": (prev_1)=>(prev_1 + 1) % featuredSongs.length
                        }["HeroCarousel[<button>.onClick > setCurrentIndex()]"])
                }["HeroCarousel[<button>.onClick]"],
                className: "absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 z-20 cursor-pointer",
                title: "Berikutnya",
                children: t17
            }, void 0, false, {
                fileName: "[project]/src/components/HeroCarousel.tsx",
                lineNumber: 197,
                columnNumber: 359
            }, this),
            t21
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HeroCarousel.tsx",
        lineNumber: 193,
        columnNumber: 10
    }, this);
}
_s(HeroCarousel, "tPjzCc9H5UuFdWNuAHYoD0K4UOk=");
_c = HeroCarousel;
var _c;
__turbopack_context__.k.register(_c, "HeroCarousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TabSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORIES",
    ()=>CATEGORIES,
    "default",
    ()=>TabSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
const CATEGORIES = [
    {
        id: "All Songs",
        label: "Semua Lagu",
        icon: "ri-music-fill"
    },
    {
        id: "Favorites",
        label: "Favorit",
        icon: "ri-heart-3-fill"
    },
    {
        id: "Indie / Acoustic",
        label: "Indie / Acoustic",
        icon: "ri-headphone-fill"
    },
    {
        id: "Pop",
        label: "Pop Hits",
        icon: "ri-fire-fill"
    },
    {
        id: "R&B / Soul",
        label: "R&B / Soul",
        icon: "ri-sparkling-fill"
    },
    {
        id: "Lo-Fi / Ambient",
        label: "Lo-Fi / Chill",
        icon: "ri-moon-clear-fill"
    },
    {
        id: "Indonesian Hits",
        label: "Indo Pop",
        icon: "ri-flag-fill"
    }
];
function TabSection(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(20);
    if ($[0] !== "e97333bb890280c4c6cc0e4bdf372f3aee4a8df8fada10b1cec552e7994eb37d") {
        for(let $i = 0; $i < 20; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e97333bb890280c4c6cc0e4bdf372f3aee4a8df8fada10b1cec552e7994eb37d";
    }
    const { activeTab, setActiveTab, sortBy, setSortBy, favoritesCount: t1 } = t0;
    const favoritesCount = t1 === undefined ? 0 : t1;
    let t2;
    if ($[1] !== activeTab || $[2] !== favoritesCount || $[3] !== setActiveTab) {
        t2 = CATEGORIES.map({
            "TabSection[CATEGORIES.map()]": (cat)=>{
                const isActive = activeTab === cat.id;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "TabSection[CATEGORIES.map() > <button>.onClick]": ()=>setActiveTab(cat.id)
                    }["TabSection[CATEGORIES.map() > <button>.onClick]"],
                    className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive ? "bg-[#22c527] text-black shadow-[0_0_15px_rgba(34,197,39,0.35)] scale-105" : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: `${cat.icon} text-xs`
                        }, void 0, false, {
                            fileName: "[project]/src/components/TabSection.tsx",
                            lineNumber: 62,
                            columnNumber: 388
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: cat.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/TabSection.tsx",
                            lineNumber: 62,
                            columnNumber: 427
                        }, this),
                        cat.id === "Favorites" && favoritesCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5 ${isActive ? "bg-black/20 text-black" : "bg-white/10 text-[#22c527]"}`,
                            children: favoritesCount
                        }, void 0, false, {
                            fileName: "[project]/src/components/TabSection.tsx",
                            lineNumber: 62,
                            columnNumber: 500
                        }, this)
                    ]
                }, cat.id, true, {
                    fileName: "[project]/src/components/TabSection.tsx",
                    lineNumber: 60,
                    columnNumber: 16
                }, this);
            }
        }["TabSection[CATEGORIES.map()]"]);
        $[1] = activeTab;
        $[2] = favoritesCount;
        $[3] = setActiveTab;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 overflow-x-auto scrollbar-hide w-full sm:w-auto py-1",
            children: t2
        }, void 0, false, {
            fileName: "[project]/src/components/TabSection.tsx",
            lineNumber: 74,
            columnNumber: 10
        }, this);
        $[5] = t2;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    let t5;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: "ri-sort-desc text-white/60"
        }, void 0, false, {
            fileName: "[project]/src/components/TabSection.tsx",
            lineNumber: 83,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Urutkan:"
        }, void 0, false, {
            fileName: "[project]/src/components/TabSection.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[7] = t4;
        $[8] = t5;
    } else {
        t4 = $[7];
        t5 = $[8];
    }
    let t6;
    if ($[9] !== setSortBy) {
        t6 = ({
            "TabSection[<select>.onChange]": (e)=>setSortBy(e.target.value)
        })["TabSection[<select>.onChange]"];
        $[9] = setSortBy;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    let t8;
    let t9;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "default",
            className: "bg-[#18181b] text-white",
            children: "Default"
        }, void 0, false, {
            fileName: "[project]/src/components/TabSection.tsx",
            lineNumber: 105,
            columnNumber: 10
        }, this);
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "title",
            className: "bg-[#18181b] text-white",
            children: "Judul (A-Z)"
        }, void 0, false, {
            fileName: "[project]/src/components/TabSection.tsx",
            lineNumber: 106,
            columnNumber: 10
        }, this);
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "artist",
            className: "bg-[#18181b] text-white",
            children: "Artis (A-Z)"
        }, void 0, false, {
            fileName: "[project]/src/components/TabSection.tsx",
            lineNumber: 107,
            columnNumber: 10
        }, this);
        $[11] = t7;
        $[12] = t8;
        $[13] = t9;
    } else {
        t7 = $[11];
        t8 = $[12];
        t9 = $[13];
    }
    let t10;
    if ($[14] !== sortBy || $[15] !== t6) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 self-end sm:self-auto text-xs text-white/50 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5 shrink-0",
            children: [
                t4,
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: sortBy,
                    onChange: t6,
                    className: "bg-transparent text-white font-medium focus:outline-none cursor-pointer",
                    children: [
                        t7,
                        t8,
                        t9
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/TabSection.tsx",
                    lineNumber: 118,
                    columnNumber: 171
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/TabSection.tsx",
            lineNumber: 118,
            columnNumber: 11
        }, this);
        $[14] = sortBy;
        $[15] = t6;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[17] !== t10 || $[18] !== t3) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6",
            children: [
                t3,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/TabSection.tsx",
            lineNumber: 127,
            columnNumber: 11
        }, this);
        $[17] = t10;
        $[18] = t3;
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    return t11;
}
_c = TabSection;
var _c;
__turbopack_context__.k.register(_c, "TabSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AlbumCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AlbumCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
;
;
function AlbumCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(55);
    if ($[0] !== "eaed8c58df36d00fc24c01b1854e9aa6d66b79d1ade6603f60263ad90ff2a3e2") {
        for(let $i = 0; $i < 55; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "eaed8c58df36d00fc24c01b1854e9aa6d66b79d1ade6603f60263ad90ff2a3e2";
    }
    const { data, isCurrentSong, isPlaying, isLiked, onPlay, onToggleLike } = t0;
    let t1;
    let t2;
    let t3;
    let t4;
    let t5;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            y: -6,
            scale: 1.02
        };
        t2 = {
            scale: 0.96
        };
        t3 = {
            opacity: 0,
            y: 15
        };
        t4 = {
            opacity: 1,
            y: 0
        };
        t5 = {
            type: "spring",
            stiffness: 350,
            damping: 25
        };
        $[1] = t1;
        $[2] = t2;
        $[3] = t3;
        $[4] = t4;
        $[5] = t5;
    } else {
        t1 = $[1];
        t2 = $[2];
        t3 = $[3];
        t4 = $[4];
        t5 = $[5];
    }
    const t6 = `group relative flex flex-col gap-2.5 p-3 rounded-2xl cursor-pointer transition-colors duration-300 ${isCurrentSong ? "bg-white/8 border border-[#22c527]/40 shadow-[0_4px_25px_rgba(34,197,39,0.15)]" : "bg-white/3 hover:bg-white/7 border border-white/5 hover:border-white/10"}`;
    const t7 = `w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isCurrentSong && isPlaying ? "brightness-90" : ""}`;
    let t8;
    if ($[6] !== data.cover || $[7] !== data.title || $[8] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: data.cover,
            alt: data.title,
            loading: "lazy",
            className: t7
        }, void 0, false, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 72,
            columnNumber: 10
        }, this);
        $[6] = data.cover;
        $[7] = data.title;
        $[8] = t7;
        $[9] = t8;
    } else {
        t8 = $[9];
    }
    let t9;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        }, void 0, false, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 82,
            columnNumber: 10
        }, this);
        $[10] = t9;
    } else {
        t9 = $[10];
    }
    const t10 = `absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 z-10 ${isLiked ? "bg-black/60 text-[#22c527] scale-100 opacity-100" : "bg-black/50 text-white/60 hover:text-white opacity-0 group-hover:opacity-100 hover:scale-110"}`;
    const t11 = isLiked ? "Hapus dari Favorit" : "Tambah ke Favorit";
    const t12 = `${isLiked ? "ri-heart-3-fill text-[#22c527]" : "ri-heart-3-line"} text-base`;
    let t13;
    if ($[11] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: t12
        }, void 0, false, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 92,
            columnNumber: 11
        }, this);
        $[11] = t12;
        $[12] = t13;
    } else {
        t13 = $[12];
    }
    let t14;
    if ($[13] !== onToggleLike || $[14] !== t10 || $[15] !== t11 || $[16] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onToggleLike,
            className: t10,
            title: t11,
            children: t13
        }, void 0, false, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 100,
            columnNumber: 11
        }, this);
        $[13] = onToggleLike;
        $[14] = t10;
        $[15] = t11;
        $[16] = t13;
        $[17] = t14;
    } else {
        t14 = $[17];
    }
    const t15 = `absolute inset-0 flex items-center justify-center transition-all duration-300 ${isCurrentSong ? "opacity-100 bg-black/30 backdrop-blur-[1px]" : "opacity-0 group-hover:opacity-100 bg-black/35 backdrop-blur-[1px]"}`;
    let t16;
    let t17;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = {
            scale: 1.15
        };
        t17 = {
            scale: 0.9
        };
        $[18] = t16;
        $[19] = t17;
    } else {
        t16 = $[18];
        t17 = $[19];
    }
    const t18 = `w-11 h-11 rounded-full flex items-center justify-center shadow-xl transition-all ${isCurrentSong ? "bg-[#22c527] text-black shadow-[0_0_20px_rgba(34,197,39,0.5)]" : "bg-white text-black hover:bg-[#22c527]"}`;
    let t19;
    if ($[20] !== isCurrentSong || $[21] !== isPlaying) {
        t19 = isCurrentSong && isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: "ri-pause-fill text-2xl"
        }, void 0, false, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 128,
            columnNumber: 40
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: "ri-play-fill text-2xl ml-0.5"
        }, void 0, false, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 128,
            columnNumber: 83
        }, this);
        $[20] = isCurrentSong;
        $[21] = isPlaying;
        $[22] = t19;
    } else {
        t19 = $[22];
    }
    let t20;
    if ($[23] !== t18 || $[24] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            whileHover: t16,
            whileTap: t17,
            className: t18,
            children: t19
        }, void 0, false, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 137,
            columnNumber: 11
        }, this);
        $[23] = t18;
        $[24] = t19;
        $[25] = t20;
    } else {
        t20 = $[25];
    }
    let t21;
    if ($[26] !== t15 || $[27] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t15,
            children: t20
        }, void 0, false, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 146,
            columnNumber: 11
        }, this);
        $[26] = t15;
        $[27] = t20;
        $[28] = t21;
    } else {
        t21 = $[28];
    }
    let t22;
    if ($[29] !== isCurrentSong || $[30] !== isPlaying) {
        t22 = isCurrentSong && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute bottom-2.5 left-2.5 px-2 py-1 rounded-full bg-black/75 backdrop-blur-md flex items-center gap-1 border border-white/10 z-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `w-1 bg-[#22c527] rounded-full ${isPlaying ? "animate-music-bar-1 h-3" : "h-1.5"}`
                }, void 0, false, {
                    fileName: "[project]/src/components/AlbumCard.tsx",
                    lineNumber: 155,
                    columnNumber: 178
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `w-1 bg-[#22c527] rounded-full ${isPlaying ? "animate-music-bar-2 h-4" : "h-2.5"}`
                }, void 0, false, {
                    fileName: "[project]/src/components/AlbumCard.tsx",
                    lineNumber: 155,
                    columnNumber: 281
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `w-1 bg-[#22c527] rounded-full ${isPlaying ? "animate-music-bar-3 h-2" : "h-1"}`
                }, void 0, false, {
                    fileName: "[project]/src/components/AlbumCard.tsx",
                    lineNumber: 155,
                    columnNumber: 384
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 155,
            columnNumber: 28
        }, this);
        $[29] = isCurrentSong;
        $[30] = isPlaying;
        $[31] = t22;
    } else {
        t22 = $[31];
    }
    let t23;
    if ($[32] !== t14 || $[33] !== t21 || $[34] !== t22 || $[35] !== t8) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative aspect-square w-full overflow-hidden rounded-xl shadow-md bg-black/40",
            children: [
                t8,
                t9,
                t14,
                t21,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 164,
            columnNumber: 11
        }, this);
        $[32] = t14;
        $[33] = t21;
        $[34] = t22;
        $[35] = t8;
        $[36] = t23;
    } else {
        t23 = $[36];
    }
    const t24 = `font-bold text-xs md:text-sm truncate transition-colors ${isCurrentSong ? "text-[#22c527]" : "text-white group-hover:text-[#22c527]"}`;
    let t25;
    if ($[37] !== data.title || $[38] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
            className: t24,
            title: data.title,
            children: data.title
        }, void 0, false, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 176,
            columnNumber: 11
        }, this);
        $[37] = data.title;
        $[38] = t24;
        $[39] = t25;
    } else {
        t25 = $[39];
    }
    let t26;
    if ($[40] !== data.artist) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "truncate max-w-[70%]",
            title: data.artist,
            children: data.artist
        }, void 0, false, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 185,
            columnNumber: 11
        }, this);
        $[40] = data.artist;
        $[41] = t26;
    } else {
        t26 = $[41];
    }
    let t27;
    if ($[42] !== data.genre) {
        t27 = data.genre && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[9px] uppercase tracking-wider text-white/35 font-medium px-1.5 py-0.2 bg-white/5 rounded",
            children: data.genre.split("/")[0].trim()
        }, void 0, false, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 193,
            columnNumber: 25
        }, this);
        $[42] = data.genre;
        $[43] = t27;
    } else {
        t27 = $[43];
    }
    let t28;
    if ($[44] !== t26 || $[45] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between text-[11px] text-white/50",
            children: [
                t26,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 201,
            columnNumber: 11
        }, this);
        $[44] = t26;
        $[45] = t27;
        $[46] = t28;
    } else {
        t28 = $[46];
    }
    let t29;
    if ($[47] !== t25 || $[48] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-0.5",
            children: [
                t25,
                t28
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 210,
            columnNumber: 11
        }, this);
        $[47] = t25;
        $[48] = t28;
        $[49] = t29;
    } else {
        t29 = $[49];
    }
    let t30;
    if ($[50] !== onPlay || $[51] !== t23 || $[52] !== t29 || $[53] !== t6) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            onClick: onPlay,
            whileHover: t1,
            whileTap: t2,
            initial: t3,
            animate: t4,
            transition: t5,
            className: t6,
            children: [
                t23,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AlbumCard.tsx",
            lineNumber: 219,
            columnNumber: 11
        }, this);
        $[50] = onPlay;
        $[51] = t23;
        $[52] = t29;
        $[53] = t6;
        $[54] = t30;
    } else {
        t30 = $[54];
    }
    return t30;
}
_c = AlbumCard;
var _c;
__turbopack_context__.k.register(_c, "AlbumCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SongList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SongList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AlbumCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AlbumCard.tsx [app-client] (ecmascript)");
;
;
;
function SongList(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "f535d672a027945882f5c8a30732f8b3faaf807397c2cafb8c687accce4a89fc") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f535d672a027945882f5c8a30732f8b3faaf807397c2cafb8c687accce4a89fc";
    }
    const { songs, currentSong, isPlaying, likedSongs, onPlay, onToggleLike } = t0;
    let t1;
    if ($[1] !== currentSong?.id || $[2] !== isPlaying || $[3] !== likedSongs || $[4] !== onPlay || $[5] !== onToggleLike || $[6] !== songs) {
        let t2;
        if ($[8] !== currentSong?.id || $[9] !== isPlaying || $[10] !== likedSongs || $[11] !== onPlay || $[12] !== onToggleLike) {
            t2 = ({
                "SongList[songs.map()]": (song)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AlbumCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        data: song,
                        isCurrentSong: currentSong?.id === song.id,
                        isPlaying: isPlaying,
                        isLiked: likedSongs.includes(song.id),
                        onPlay: {
                            "SongList[songs.map() > <AlbumCard>.onPlay]": ()=>onPlay(song)
                        }["SongList[songs.map() > <AlbumCard>.onPlay]"],
                        onToggleLike: {
                            "SongList[songs.map() > <AlbumCard>.onToggleLike]": (e)=>{
                                e.stopPropagation();
                                onToggleLike(song);
                            }
                        }["SongList[songs.map() > <AlbumCard>.onToggleLike]"]
                    }, song.id, false, {
                        fileName: "[project]/src/components/SongList.tsx",
                        lineNumber: 34,
                        columnNumber: 42
                    }, this)
            })["SongList[songs.map()]"];
            $[8] = currentSong?.id;
            $[9] = isPlaying;
            $[10] = likedSongs;
            $[11] = onPlay;
            $[12] = onToggleLike;
            $[13] = t2;
        } else {
            t2 = $[13];
        }
        t1 = songs.map(t2);
        $[1] = currentSong?.id;
        $[2] = isPlaying;
        $[3] = likedSongs;
        $[4] = onPlay;
        $[5] = onToggleLike;
        $[6] = songs;
        $[7] = t1;
    } else {
        t1 = $[7];
    }
    let t2;
    if ($[14] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 md:gap-4",
            children: t1
        }, void 0, false, {
            fileName: "[project]/src/components/SongList.tsx",
            lineNumber: 65,
            columnNumber: 10
        }, this);
        $[14] = t1;
        $[15] = t2;
    } else {
        t2 = $[15];
    }
    return t2;
}
_c = SongList;
var _c;
__turbopack_context__.k.register(_c, "SongList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function Footer() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "8c29704d963fb5960e08207cf6cd28cb3d0371e1510af8ac69566c1a6387967f") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8c29704d963fb5960e08207cf6cd28cb3d0371e1510af8ac69566c1a6387967f";
    }
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-[#22c527] font-extrabold text-lg tracking-tight mb-2",
            children: "ONE MUSIC"
        }, void 0, false, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 14,
            columnNumber: 10
        }, this);
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-white/40 text-sm mb-6 max-w-md mx-auto",
            children: "Music is a universal language that brings people together. Enjoy your favorite songs with One Music."
        }, void 0, false, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 15,
            columnNumber: 10
        }, this);
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: "https://github.com/wannn-sion95",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-white transition transform hover:scale-110",
            "aria-label": "Github",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "ri-github-fill text-2xl"
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 24,
                columnNumber: 180
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 24,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: "https://x.com/wannn_sion9",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-white transition transform hover:scale-110",
            "aria-label": "Twitter",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "ri-twitter-x-fill text-2xl"
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 31,
                columnNumber: 175
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 31,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: "https://www.instagram.com/wannn_sion?igsh=djF2MWpiM3ZlOGhk",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-white transition transform hover:scale-110",
            "aria-label": "Instagram",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "ri-instagram-fill text-2xl"
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 38,
                columnNumber: 210
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 38,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: "https://www.facebook.com/profile.php?id=100035657014919",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-white transition transform hover:scale-110",
            "aria-label": "Instagram",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "ri-facebook-fill text-2xl"
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.tsx",
                lineNumber: 45,
                columnNumber: 207
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 45,
            columnNumber: 10
        }, this);
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    let t7;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center gap-6 text-white/60 mb-4",
            children: [
                t2,
                t3,
                t4,
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "https://www.linkedin.com/in/mhd-ridwan",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "hover:text-white transition transform hover:scale-110",
                    "aria-label": "LinkedIn",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "ri-linkedin-fill text-2xl"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.tsx",
                        lineNumber: 53,
                        columnNumber: 267
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 53,
                    columnNumber: 88
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-white/20 text-xs py-3",
            children: "Gmail: wannnsion95@gmail.com"
        }, void 0, false, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 54,
            columnNumber: 10
        }, this);
        $[7] = t6;
        $[8] = t7;
    } else {
        t6 = $[7];
        t7 = $[8];
    }
    let t8;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: "mt-20 mb-10 text-center border-t border-white/5 pt-10",
            children: [
                t0,
                t1,
                t6,
                t7,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-white/20 text-xs",
                    children: [
                        "© 2026 Created by",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white/60 hover:text-[#22c527] transition font-bold cursor-pointer",
                            children: "Wannn Sion"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Footer.tsx",
                            lineNumber: 63,
                            columnNumber: 159
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Footer.tsx",
                    lineNumber: 63,
                    columnNumber: 100
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Footer.tsx",
            lineNumber: 63,
            columnNumber: 10
        }, this);
        $[9] = t8;
    } else {
        t8 = $[9];
    }
    return t8;
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MiniPlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MiniPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
/* eslint-disable @next/next/no-img-element */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const formatTime = (seconds)=>{
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
};
function MiniPlayer(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(110);
    if ($[0] !== "99349ae177aeecac0ff3d397cb0f0633bfd71fb4fec0bd5676b585cd4c3a99dd") {
        for(let $i = 0; $i < 110; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "99349ae177aeecac0ff3d397cb0f0633bfd71fb4fec0bd5676b585cd4c3a99dd";
    }
    const { currentSong, isPlaying, progress, duration, volume, isLiked, onPlayPause, onNext, onPrev, onSeek, onVolumeChange, onToggleLike, onExpand, onOpenQueue } = t0;
    const [showVolumePopup, setShowVolumePopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!currentSong) {
        return null;
    }
    const progressPercent = duration > 0 ? progress / duration * 100 : 0;
    let t1;
    if ($[1] !== duration || $[2] !== onSeek) {
        t1 = ({
            "MiniPlayer[handleProgressBarClick]": (e)=>{
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = clickX / rect.width * duration;
                onSeek(newProgress);
            }
        })["MiniPlayer[handleProgressBarClick]"];
        $[1] = duration;
        $[2] = onSeek;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const handleProgressBarClick = t1;
    let t2;
    let t3;
    let t4;
    let t5;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            y: 80,
            opacity: 0
        };
        t3 = {
            y: 0,
            opacity: 1
        };
        t4 = {
            y: 80,
            opacity: 0
        };
        t5 = {
            type: "spring",
            damping: 25,
            stiffness: 280
        };
        $[4] = t2;
        $[5] = t3;
        $[6] = t4;
        $[7] = t5;
    } else {
        t2 = $[4];
        t3 = $[5];
        t4 = $[6];
        t5 = $[7];
    }
    const t6 = `${progressPercent}%`;
    let t7;
    if ($[8] !== t6) {
        t7 = {
            width: t6
        };
        $[8] = t6;
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    let t8;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white opacity-0 group-hover/bar:opacity-100 shadow-md"
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 120,
            columnNumber: 10
        }, this);
        $[10] = t8;
    } else {
        t8 = $[10];
    }
    let t9;
    if ($[11] !== t7) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full bg-linear-to-r from-[#22c527] to-emerald-400 relative",
            style: t7,
            children: t8
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 127,
            columnNumber: 10
        }, this);
        $[11] = t7;
        $[12] = t9;
    } else {
        t9 = $[12];
    }
    let t10;
    if ($[13] !== handleProgressBarClick || $[14] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: handleProgressBarClick,
            className: "absolute top-0 left-0 right-0 h-1.5 hover:h-2.5 bg-white/10 cursor-pointer transition-all z-20 group/bar",
            title: "Klik untuk geser durasi",
            children: t9
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 135,
            columnNumber: 11
        }, this);
        $[13] = handleProgressBarClick;
        $[14] = t9;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute -left-10 -bottom-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none",
            style: {
                backgroundImage: "radial-gradient(circle, #22c527, transparent 70%)"
            }
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 144,
            columnNumber: 11
        }, this);
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    const t12 = `w-11 h-11 md:w-13 md:h-13 rounded-xl overflow-hidden border border-white/15 shadow-lg ${isPlaying ? "scale-105" : "scale-100"} transition-transform duration-300`;
    let t13;
    if ($[17] !== currentSong.cover || $[18] !== currentSong.title) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: currentSong.cover,
            alt: currentSong.title,
            className: "w-full h-full object-cover"
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 154,
            columnNumber: 11
        }, this);
        $[17] = currentSong.cover;
        $[18] = currentSong.title;
        $[19] = t13;
    } else {
        t13 = $[19];
    }
    let t14;
    if ($[20] !== t12 || $[21] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t12,
            children: t13
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 163,
            columnNumber: 11
        }, this);
        $[20] = t12;
        $[21] = t13;
        $[22] = t14;
    } else {
        t14 = $[22];
    }
    let t15;
    if ($[23] !== isPlaying) {
        t15 = isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#22c527] rounded-full flex items-center justify-center border-2 border-[#151518]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-1 h-1 bg-black rounded-full animate-ping"
            }, void 0, false, {
                fileName: "[project]/src/components/MiniPlayer.tsx",
                lineNumber: 172,
                columnNumber: 163
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 172,
            columnNumber: 24
        }, this);
        $[23] = isPlaying;
        $[24] = t15;
    } else {
        t15 = $[24];
    }
    let t16;
    if ($[25] !== t14 || $[26] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative shrink-0",
            children: [
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 180,
            columnNumber: 11
        }, this);
        $[25] = t14;
        $[26] = t15;
        $[27] = t16;
    } else {
        t16 = $[27];
    }
    let t17;
    if ($[28] !== currentSong.title) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "text-white font-bold text-xs md:text-sm truncate group-hover:text-[#22c527] transition-colors",
                children: currentSong.title
            }, void 0, false, {
                fileName: "[project]/src/components/MiniPlayer.tsx",
                lineNumber: 189,
                columnNumber: 52
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 189,
            columnNumber: 11
        }, this);
        $[28] = currentSong.title;
        $[29] = t17;
    } else {
        t17 = $[29];
    }
    let t18;
    if ($[30] !== currentSong.artist) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-white/50 text-[11px] md:text-xs truncate",
            children: currentSong.artist
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 197,
            columnNumber: 11
        }, this);
        $[30] = currentSong.artist;
        $[31] = t18;
    } else {
        t18 = $[31];
    }
    let t19;
    if ($[32] !== t17 || $[33] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col min-w-0 overflow-hidden",
            children: [
                t17,
                t18
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 205,
            columnNumber: 11
        }, this);
        $[32] = t17;
        $[33] = t18;
        $[34] = t19;
    } else {
        t19 = $[34];
    }
    let t20;
    if ($[35] !== onToggleLike) {
        t20 = ({
            "MiniPlayer[<button>.onClick]": (e_0)=>{
                e_0.stopPropagation();
                onToggleLike();
            }
        })["MiniPlayer[<button>.onClick]"];
        $[35] = onToggleLike;
        $[36] = t20;
    } else {
        t20 = $[36];
    }
    const t21 = `p-2 rounded-full transition-transform active:scale-125 ml-1 hidden sm:flex items-center justify-center ${isLiked ? "text-[#22c527]" : "text-white/40 hover:text-white"}`;
    const t22 = isLiked ? "Hapus dari Favorit" : "Simpan ke Favorit";
    const t23 = `text-lg ${isLiked ? "ri-heart-3-fill" : "ri-heart-3-line"}`;
    let t24;
    if ($[37] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: t23
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 230,
            columnNumber: 11
        }, this);
        $[37] = t23;
        $[38] = t24;
    } else {
        t24 = $[38];
    }
    let t25;
    if ($[39] !== t20 || $[40] !== t21 || $[41] !== t22 || $[42] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t20,
            className: t21,
            title: t22,
            children: t24
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 238,
            columnNumber: 11
        }, this);
        $[39] = t20;
        $[40] = t21;
        $[41] = t22;
        $[42] = t24;
        $[43] = t25;
    } else {
        t25 = $[43];
    }
    let t26;
    if ($[44] !== t16 || $[45] !== t19 || $[46] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 overflow-hidden flex-1 min-w-0 pr-2",
            children: [
                t16,
                t19,
                t25
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 249,
            columnNumber: 11
        }, this);
        $[44] = t16;
        $[45] = t19;
        $[46] = t25;
        $[47] = t26;
    } else {
        t26 = $[47];
    }
    let t27;
    if ($[48] !== progress) {
        t27 = formatTime(progress);
        $[48] = progress;
        $[49] = t27;
    } else {
        t27 = $[49];
    }
    let t28;
    if ($[50] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-white/80",
            children: t27
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 267,
            columnNumber: 11
        }, this);
        $[50] = t27;
        $[51] = t28;
    } else {
        t28 = $[51];
    }
    let t29;
    if ($[52] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "/"
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 275,
            columnNumber: 11
        }, this);
        $[52] = t29;
    } else {
        t29 = $[52];
    }
    let t30;
    if ($[53] !== duration) {
        t30 = formatTime(duration);
        $[53] = duration;
        $[54] = t30;
    } else {
        t30 = $[54];
    }
    let t31;
    if ($[55] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t30
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 290,
            columnNumber: 11
        }, this);
        $[55] = t30;
        $[56] = t31;
    } else {
        t31 = $[56];
    }
    let t32;
    if ($[57] !== t28 || $[58] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden md:flex items-center gap-1 text-[11px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/5",
            children: [
                t28,
                t29,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 298,
            columnNumber: 11
        }, this);
        $[57] = t28;
        $[58] = t31;
        $[59] = t32;
    } else {
        t32 = $[59];
    }
    let t33;
    if ($[60] !== onPrev) {
        t33 = ({
            "MiniPlayer[<button>.onClick]": (e_1)=>{
                e_1.stopPropagation();
                onPrev();
            }
        })["MiniPlayer[<button>.onClick]"];
        $[60] = onPrev;
        $[61] = t33;
    } else {
        t33 = $[61];
    }
    let t34;
    if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: "ri-skip-back-fill text-lg md:text-xl"
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 320,
            columnNumber: 11
        }, this);
        $[62] = t34;
    } else {
        t34 = $[62];
    }
    let t35;
    if ($[63] !== t33) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t33,
            className: "w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/60 hover:text-white hover:scale-110 active:scale-95 transition",
            title: "Lagu Sebelumnya",
            children: t34
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 327,
            columnNumber: 11
        }, this);
        $[63] = t33;
        $[64] = t35;
    } else {
        t35 = $[64];
    }
    let t36;
    if ($[65] !== onPlayPause) {
        t36 = ({
            "MiniPlayer[<button>.onClick]": (e_2)=>{
                e_2.stopPropagation();
                onPlayPause();
            }
        })["MiniPlayer[<button>.onClick]"];
        $[65] = onPlayPause;
        $[66] = t36;
    } else {
        t36 = $[66];
    }
    const t37 = isPlaying ? "Jeda" : "Putar";
    const t38 = `${isPlaying ? "ri-pause-fill" : "ri-play-fill"} text-xl md:text-2xl ml-0.5`;
    let t39;
    if ($[67] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: t38
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 350,
            columnNumber: 11
        }, this);
        $[67] = t38;
        $[68] = t39;
    } else {
        t39 = $[68];
    }
    let t40;
    if ($[69] !== t36 || $[70] !== t37 || $[71] !== t39) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t36,
            className: "w-10 h-10 md:w-11 md:h-11 bg-white hover:bg-[#22c527] text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg shadow-white/10",
            title: t37,
            children: t39
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 358,
            columnNumber: 11
        }, this);
        $[69] = t36;
        $[70] = t37;
        $[71] = t39;
        $[72] = t40;
    } else {
        t40 = $[72];
    }
    let t41;
    if ($[73] !== onNext) {
        t41 = ({
            "MiniPlayer[<button>.onClick]": (e_3)=>{
                e_3.stopPropagation();
                onNext();
            }
        })["MiniPlayer[<button>.onClick]"];
        $[73] = onNext;
        $[74] = t41;
    } else {
        t41 = $[74];
    }
    let t42;
    if ($[75] === Symbol.for("react.memo_cache_sentinel")) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: "ri-skip-forward-fill text-lg md:text-xl"
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 381,
            columnNumber: 11
        }, this);
        $[75] = t42;
    } else {
        t42 = $[75];
    }
    let t43;
    if ($[76] !== t41) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t41,
            className: "w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white/60 hover:text-white hover:scale-110 active:scale-95 transition",
            title: "Lagu Berikutnya",
            children: t42
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 388,
            columnNumber: 11
        }, this);
        $[76] = t41;
        $[77] = t43;
    } else {
        t43 = $[77];
    }
    let t44;
    if ($[78] !== t35 || $[79] !== t40 || $[80] !== t43) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1 md:gap-2",
            children: [
                t35,
                t40,
                t43
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 396,
            columnNumber: 11
        }, this);
        $[78] = t35;
        $[79] = t40;
        $[80] = t43;
        $[81] = t44;
    } else {
        t44 = $[81];
    }
    let t45;
    if ($[82] === Symbol.for("react.memo_cache_sentinel")) {
        t45 = ({
            "MiniPlayer[<button>.onClick]": (e_4)=>{
                e_4.stopPropagation();
                setShowVolumePopup(_MiniPlayerButtonOnClickSetShowVolumePopup);
            }
        })["MiniPlayer[<button>.onClick]"];
        $[82] = t45;
    } else {
        t45 = $[82];
    }
    const t46 = `text-lg ri-${volume === 0 ? "volume-mute-line" : volume < 0.5 ? "volume-down-line" : "volume-up-line"}`;
    let t47;
    if ($[83] !== t46) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t45,
            className: "w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition",
            title: "Volume",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: t46
            }, void 0, false, {
                fileName: "[project]/src/components/MiniPlayer.tsx",
                lineNumber: 419,
                columnNumber: 143
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 419,
            columnNumber: 11
        }, this);
        $[83] = t46;
        $[84] = t47;
    } else {
        t47 = $[84];
    }
    let t48;
    if ($[85] !== onVolumeChange || $[86] !== showVolumePopup || $[87] !== volume) {
        t48 = showVolumePopup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: _MiniPlayerDivOnClick,
            className: "absolute bottom-12 right-0 bg-[#1c1c22] border border-white/15 p-3 rounded-2xl shadow-xl flex items-center gap-2 w-36 z-30",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    onClick: {
                        "MiniPlayer[<i>.onClick]": ()=>onVolumeChange(volume === 0 ? 1 : 0)
                    }["MiniPlayer[<i>.onClick]"],
                    className: "ri-volume-mute-fill text-white/50 hover:text-white cursor-pointer text-sm"
                }, void 0, false, {
                    fileName: "[project]/src/components/MiniPlayer.tsx",
                    lineNumber: 427,
                    columnNumber: 202
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "range",
                    min: "0",
                    max: "1",
                    step: "0.01",
                    value: volume,
                    onChange: {
                        "MiniPlayer[<input>.onChange]": (e_6)=>onVolumeChange(parseFloat(e_6.target.value))
                    }["MiniPlayer[<input>.onChange]"],
                    className: "w-full accent-[#22c527] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                }, void 0, false, {
                    fileName: "[project]/src/components/MiniPlayer.tsx",
                    lineNumber: 429,
                    columnNumber: 125
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 427,
            columnNumber: 30
        }, this);
        $[85] = onVolumeChange;
        $[86] = showVolumePopup;
        $[87] = volume;
        $[88] = t48;
    } else {
        t48 = $[88];
    }
    let t49;
    if ($[89] !== t47 || $[90] !== t48) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden lg:flex items-center relative",
            children: [
                t47,
                t48
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 441,
            columnNumber: 11
        }, this);
        $[89] = t47;
        $[90] = t48;
        $[91] = t49;
    } else {
        t49 = $[91];
    }
    let t50;
    if ($[92] !== onOpenQueue) {
        t50 = onOpenQueue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: {
                "MiniPlayer[<button>.onClick]": (e_7)=>{
                    e_7.stopPropagation();
                    onOpenQueue();
                }
            }["MiniPlayer[<button>.onClick]"],
            className: "w-8 h-8 hidden sm:flex items-center justify-center text-white/50 hover:text-white transition",
            title: "Antrean Lagu (Up Next)",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: "ri-play-list-2-line text-lg"
            }, void 0, false, {
                fileName: "[project]/src/components/MiniPlayer.tsx",
                lineNumber: 455,
                columnNumber: 176
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 450,
            columnNumber: 26
        }, this);
        $[92] = onOpenQueue;
        $[93] = t50;
    } else {
        t50 = $[93];
    }
    let t51;
    if ($[94] !== onExpand) {
        t51 = ({
            "MiniPlayer[<button>.onClick]": (e_8)=>{
                e_8.stopPropagation();
                onExpand();
            }
        })["MiniPlayer[<button>.onClick]"];
        $[94] = onExpand;
        $[95] = t51;
    } else {
        t51 = $[95];
    }
    let t52;
    if ($[96] === Symbol.for("react.memo_cache_sentinel")) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
            className: "ri-arrow-up-s-line text-xl group-hover:-translate-y-0.5 transition-transform"
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 476,
            columnNumber: 11
        }, this);
        $[96] = t52;
    } else {
        t52 = $[96];
    }
    let t53;
    if ($[97] !== t51) {
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t51,
            className: "w-8 h-8 flex items-center justify-center text-white/50 group-hover:text-white transition",
            title: "Buka Player Penuh",
            children: t52
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 483,
            columnNumber: 11
        }, this);
        $[97] = t51;
        $[98] = t53;
    } else {
        t53 = $[98];
    }
    let t54;
    if ($[99] !== t32 || $[100] !== t44 || $[101] !== t49 || $[102] !== t50 || $[103] !== t53) {
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 md:gap-4 shrink-0",
            children: [
                t32,
                t44,
                t49,
                t50,
                t53
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 491,
            columnNumber: 11
        }, this);
        $[99] = t32;
        $[100] = t44;
        $[101] = t49;
        $[102] = t50;
        $[103] = t53;
        $[104] = t54;
    } else {
        t54 = $[104];
    }
    let t55;
    if ($[105] !== onExpand || $[106] !== t10 || $[107] !== t26 || $[108] !== t54) {
        t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: t2,
                animate: t3,
                exit: t4,
                transition: t5,
                className: "fixed bottom-3 md:bottom-5 left-3 right-3 md:left-6 md:right-6 z-50 max-w-5xl mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: onExpand,
                    className: "relative bg-[#151518]/90 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-2.5 md:p-3.5 flex items-center justify-between shadow-2xl cursor-pointer hover:bg-[#1c1c22]/95 hover:border-white/20 transition-all group overflow-hidden",
                    children: [
                        t10,
                        t11,
                        t26,
                        t54
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MiniPlayer.tsx",
                    lineNumber: 503,
                    columnNumber: 190
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/MiniPlayer.tsx",
                lineNumber: 503,
                columnNumber: 28
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/MiniPlayer.tsx",
            lineNumber: 503,
            columnNumber: 11
        }, this);
        $[105] = onExpand;
        $[106] = t10;
        $[107] = t26;
        $[108] = t54;
        $[109] = t55;
    } else {
        t55 = $[109];
    }
    return t55;
}
_s(MiniPlayer, "q5AgVsoChkaMW/4k+64w85WAyyc=");
_c = MiniPlayer;
function _MiniPlayerDivOnClick(e_5) {
    return e_5.stopPropagation();
}
function _MiniPlayerButtonOnClickSetShowVolumePopup(prev) {
    return !prev;
}
var _c;
__turbopack_context__.k.register(_c, "MiniPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/FullPlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FullPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
/* eslint-disable @next/next/no-img-element */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const formatTime = (seconds)=>{
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
};
const parseLRC = (text)=>{
    const lines = text.split("\n");
    const result = [];
    const regex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/;
    for (const line of lines){
        const match = regex.exec(line);
        if (match) {
            const min = parseInt(match[1]);
            const sec = parseInt(match[2]);
            const ms = match[3] ? parseInt(match[3]) : 0;
            const time = min * 60 + sec + ms / (match[3]?.length === 3 ? 1000 : 100);
            const content = line.replace(regex, "").trim();
            if (content) result.push({
                time,
                content
            });
        }
    }
    return result;
};
function FullPlayer(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(58);
    if ($[0] !== "9a133151a9652b27b0f1ff425b512a42fc545c8bd22472352b241ba9f843e4f1") {
        for(let $i = 0; $i < 58; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9a133151a9652b27b0f1ff425b512a42fc545c8bd22472352b241ba9f843e4f1";
    }
    const { isOpen, onClose, currentSong, isPlaying, onPlayPause, onNext, onPrev, progress, duration, onSeek, volume, onVolumeChange, isLiked, onToggleLike, isShuffle, repeatMode, onToggleShuffle, onToggleRepeat, playlist: t1, onSelectSong, playbackRate: t2, onPlaybackRateChange } = t0;
    let t3;
    if ($[1] !== t1) {
        t3 = t1 === undefined ? [] : t1;
        $[1] = t1;
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    const playlist = t3;
    const playbackRate = t2 === undefined ? 1 : t2;
    let t4;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = [];
        $[3] = t4;
    } else {
        t4 = $[3];
    }
    const [lyrics, setLyrics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t4);
    const [activeRightTab, setActiveRightTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("lyrics");
    const [showSpeedMenu, setShowSpeedMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t5;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = [];
        $[4] = t5;
    } else {
        t5 = $[4];
    }
    const lyricRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(t5);
    const lyricsContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDesktop, setIsDesktop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t6;
    let t7;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "FullPlayer[useEffect()]": ()=>{
                const checkDesktop = {
                    "FullPlayer[useEffect() > checkDesktop]": ()=>setIsDesktop(window.innerWidth >= 1024)
                }["FullPlayer[useEffect() > checkDesktop]"];
                checkDesktop();
                window.addEventListener("resize", checkDesktop);
                return ()=>window.removeEventListener("resize", checkDesktop);
            }
        })["FullPlayer[useEffect()]"];
        t7 = [];
        $[5] = t6;
        $[6] = t7;
    } else {
        t6 = $[5];
        t7 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t6, t7);
    let t8;
    if ($[7] !== currentSong) {
        t8 = ({
            "FullPlayer[useEffect()]": ()=>{
                let ignore = false;
                if (!currentSong?.lrc) {
                    Promise.resolve().then({
                        "FullPlayer[useEffect() > (anonymous)()]": ()=>{
                            if (!ignore) {
                                setLyrics([]);
                            }
                        }
                    }["FullPlayer[useEffect() > (anonymous)()]"]);
                    return ()=>{
                        ignore = true;
                    };
                }
                fetch(currentSong.lrc).then(_FullPlayerUseEffectAnonymous).then({
                    "FullPlayer[useEffect() > (anonymous)()]": (text)=>{
                        if (!ignore) {
                            setLyrics(parseLRC(text));
                        }
                    }
                }["FullPlayer[useEffect() > (anonymous)()]"]).catch({
                    "FullPlayer[useEffect() > (anonymous)()]": ()=>{
                        if (!ignore) {
                            setLyrics([]);
                        }
                    }
                }["FullPlayer[useEffect() > (anonymous)()]"]);
                return ()=>{
                    ignore = true;
                };
            }
        })["FullPlayer[useEffect()]"];
        $[7] = currentSong;
        $[8] = t8;
    } else {
        t8 = $[8];
    }
    const t9 = currentSong?.lrc;
    let t10;
    if ($[9] !== t9) {
        t10 = [
            t9
        ];
        $[9] = t9;
        $[10] = t10;
    } else {
        t10 = $[10];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t8, t10);
    let t11;
    bb0: {
        if (lyrics.length === 0) {
            t11 = -1;
            break bb0;
        }
        let idx = -1;
        for(let i = 0; i < lyrics.length; i++){
            if (progress >= lyrics[i].time) {
                idx = i;
            } else {
                break;
            }
        }
        t11 = idx;
    }
    const activeLyricIndex = t11;
    let t12;
    let t13;
    if ($[11] !== activeLyricIndex || $[12] !== activeRightTab || $[13] !== isOpen) {
        t12 = ({
            "FullPlayer[useEffect()]": ()=>{
                if (!isOpen || activeRightTab !== "lyrics" || activeLyricIndex === -1) {
                    return;
                }
                lyricRefs.current[activeLyricIndex]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        })["FullPlayer[useEffect()]"];
        t13 = [
            activeLyricIndex,
            isOpen,
            activeRightTab
        ];
        $[11] = activeLyricIndex;
        $[12] = activeRightTab;
        $[13] = isOpen;
        $[14] = t12;
        $[15] = t13;
    } else {
        t12 = $[14];
        t13 = $[15];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t12, t13);
    let t14;
    if ($[16] !== duration || $[17] !== onSeek) {
        t14 = ({
            "FullPlayer[handleProgressBarClick]": (e)=>{
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newTime = clickX / rect.width * duration;
                onSeek(newTime);
            }
        })["FullPlayer[handleProgressBarClick]"];
        $[16] = duration;
        $[17] = onSeek;
        $[18] = t14;
    } else {
        t14 = $[18];
    }
    const handleProgressBarClick = t14;
    let t15;
    if ($[19] !== onVolumeChange) {
        t15 = ({
            "FullPlayer[handleVolumeClick]": (e_0)=>{
                const rect_0 = e_0.currentTarget.getBoundingClientRect();
                const clickX_0 = e_0.clientX - rect_0.left;
                const newVol = Math.max(0, Math.min(1, clickX_0 / rect_0.width));
                onVolumeChange(newVol);
            }
        })["FullPlayer[handleVolumeClick]"];
        $[19] = onVolumeChange;
        $[20] = t15;
    } else {
        t15 = $[20];
    }
    const handleVolumeClick = t15;
    let t16;
    if ($[21] !== isDesktop || $[22] !== onClose) {
        t16 = ({
            "FullPlayer[handleDragEnd]": (_event, info)=>{
                if (!isDesktop && (info.offset.y > 100 || info.velocity.y > 500)) {
                    onClose();
                }
            }
        })["FullPlayer[handleDragEnd]"];
        $[21] = isDesktop;
        $[22] = onClose;
        $[23] = t16;
    } else {
        t16 = $[23];
    }
    const handleDragEnd = t16;
    if (!currentSong) {
        return null;
    }
    const progressPercent = duration > 0 ? progress / duration * 100 : 0;
    let t17;
    if ($[24] !== activeLyricIndex || $[25] !== activeRightTab || $[26] !== currentSong || $[27] !== duration || $[28] !== handleDragEnd || $[29] !== handleProgressBarClick || $[30] !== handleVolumeClick || $[31] !== isDesktop || $[32] !== isLiked || $[33] !== isOpen || $[34] !== isPlaying || $[35] !== isShuffle || $[36] !== lyrics || $[37] !== onClose || $[38] !== onNext || $[39] !== onPlayPause || $[40] !== onPlaybackRateChange || $[41] !== onPrev || $[42] !== onSeek || $[43] !== onSelectSong || $[44] !== onToggleLike || $[45] !== onToggleRepeat || $[46] !== onToggleShuffle || $[47] !== onVolumeChange || $[48] !== playbackRate || $[49] !== playlist || $[50] !== progress || $[51] !== progressPercent || $[52] !== repeatMode || $[53] !== showSpeedMenu || $[54] !== volume) {
        t17 = isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                y: "100%"
            },
            animate: {
                y: 0
            },
            exit: {
                y: "100%"
            },
            transition: {
                type: "spring",
                damping: 28,
                stiffness: 220
            },
            drag: isDesktop ? false : "y",
            dragConstraints: {
                top: 0,
                bottom: 0
            },
            dragElastic: isDesktop ? 0 : {
                top: 0,
                bottom: 0.2
            },
            onDragEnd: handleDragEnd,
            className: "fixed inset-0 z-100 bg-[#09090b] text-white flex flex-col h-dvh select-none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 overflow-hidden pointer-events-none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-cover bg-center blur-[100px] opacity-35 scale-150 transition-all duration-1000",
                            style: {
                                backgroundImage: `url('${currentSong.cover}')`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/FullPlayer.tsx",
                            lineNumber: 305,
                            columnNumber: 192
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-linear-to-b from-black/40 via-[#09090b]/80 to-[#09090b]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/FullPlayer.tsx",
                            lineNumber: 307,
                            columnNumber: 14
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/FullPlayer.tsx",
                    lineNumber: 305,
                    columnNumber: 122
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-20 flex-none flex items-center justify-between px-4 sm:px-8 py-3 lg:py-5 border-b border-white/5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center active:scale-90 transition",
                            title: "Tutup Player",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "ri-arrow-down-s-line text-2xl"
                            }, void 0, false, {
                                fileName: "[project]/src/components/FullPlayer.tsx",
                                lineNumber: 307,
                                columnNumber: 434
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/FullPlayer.tsx",
                            lineNumber: 307,
                            columnNumber: 240
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-1 bg-white/20 rounded-full mb-1.5 lg:hidden"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                    lineNumber: 307,
                                    columnNumber: 534
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] font-bold tracking-[2.5px] uppercase text-white/50",
                                    children: "Now Playing"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                    lineNumber: 307,
                                    columnNumber: 604
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-[#22c527] font-semibold tracking-wider",
                                    children: currentSong.genre || "OneMusic"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                    lineNumber: 307,
                                    columnNumber: 703
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FullPlayer.tsx",
                            lineNumber: 307,
                            columnNumber: 490
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex items-center gap-2",
                            children: [
                                onPlaybackRateChange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: {
                                                "FullPlayer[<button>.onClick]": ()=>setShowSpeedMenu(_FullPlayerButtonOnClickSetShowSpeedMenu)
                                            }["FullPlayer[<button>.onClick]"],
                                            className: "px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-white/80 transition",
                                            title: "Playback Speed",
                                            children: [
                                                playbackRate,
                                                "x"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                            lineNumber: 307,
                                            columnNumber: 920
                                        }, this),
                                        showSpeedMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-0 top-10 bg-[#16161a] border border-white/15 rounded-2xl p-1.5 shadow-2xl flex flex-col gap-1 z-30",
                                            children: [
                                                0.75,
                                                1,
                                                1.25,
                                                1.5
                                            ].map({
                                                "FullPlayer[(anonymous)()]": (rate)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: {
                                                            "FullPlayer[(anonymous)() > <button>.onClick]": ()=>{
                                                                onPlaybackRateChange(rate);
                                                                setShowSpeedMenu(false);
                                                            }
                                                        }["FullPlayer[(anonymous)() > <button>.onClick]"],
                                                        className: `px-3 py-1 text-xs rounded-xl transition ${playbackRate === rate ? "bg-[#22c527] text-black font-bold" : "text-white/70 hover:bg-white/10"}`,
                                                        children: [
                                                            rate,
                                                            "x"
                                                        ]
                                                    }, rate, true, {
                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 54
                                                    }, this)
                                            }["FullPlayer[(anonymous)()]"])
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                            lineNumber: 309,
                                            columnNumber: 245
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                    lineNumber: 307,
                                    columnNumber: 894
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onToggleLike,
                                    className: "w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center active:scale-90 transition",
                                    title: "Favorit",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: `text-xl ${isLiked ? "ri-heart-3-fill text-[#22c527]" : "ri-heart-3-line text-white/70"}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                        lineNumber: 316,
                                        columnNumber: 255
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                    lineNumber: 316,
                                    columnNumber: 61
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FullPlayer.tsx",
                            lineNumber: 307,
                            columnNumber: 819
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/FullPlayer.tsx",
                    lineNumber: 307,
                    columnNumber: 115
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 flex-1 w-full overflow-hidden flex flex-col justify-start lg:justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full overflow-y-auto lg:overflow-visible scrollbar-hide flex flex-col",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col lg:flex-row items-center lg:justify-center gap-6 lg:gap-16 px-6 pb-24 lg:pb-8 max-w-7xl mx-auto w-full min-h-min lg:h-full mt-2 lg:mt-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-none w-full max-w-md lg:w-115 flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-[82%] max-w-75 sm:max-w-85 lg:w-full aspect-square mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-6 relative group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: currentSong.cover,
                                                    alt: currentSong.title,
                                                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 979
                                                }, this),
                                                isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-1.5 border border-white/10",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-1 bg-[#22c527] rounded-full animate-music-bar-1 h-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 1289
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-1 bg-[#22c527] rounded-full animate-music-bar-2 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 1363
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-1 bg-[#22c527] rounded-full animate-music-bar-3 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 1437
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 1143
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                            lineNumber: 316,
                                            columnNumber: 819
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 text-center lg:text-left flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0 flex-1 pr-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-xl sm:text-2xl md:text-3xl font-black leading-tight truncate drop-shadow-md",
                                                            children: currentSong.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 1644
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm md:text-base text-white/60 font-medium truncate mt-0.5",
                                                            children: currentSong.artist
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 1765
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 1607
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: onToggleLike,
                                                    className: "w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center shrink-0 active:scale-125 transition",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: `text-2xl ${isLiked ? "ri-heart-3-fill text-[#22c527]" : "ri-heart-3-line text-white/50"}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 2061
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 1873
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                            lineNumber: 316,
                                            columnNumber: 1526
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full mb-3 cursor-pointer group py-2",
                                            onClick: handleProgressBarClick,
                                            title: "Klik untuk seek lagu",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full h-1.5 group-hover:h-2.5 bg-white/15 rounded-full overflow-hidden transition-all relative",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-full bg-linear-to-r from-[#22c527] to-emerald-400 rounded-full relative",
                                                        style: {
                                                            width: `${progressPercent}%`
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 22
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 2414
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 2301
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-xs font-mono font-medium text-white/50 mt-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: formatTime(progress)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 267
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: formatTime(duration)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 302
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 180
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                            lineNumber: 316,
                                            columnNumber: 2184
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between px-2 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: onToggleShuffle,
                                                    className: `transition active:scale-90 p-2 ${isShuffle ? "text-[#22c527]" : "text-white/40 hover:text-white"}`,
                                                    title: isShuffle ? "Shuffle Aktif" : "Shuffle Mati",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-shuffle-line text-2xl"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 609
                                                        }, this),
                                                        isShuffle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mx-auto mt-0.5 w-1.5 h-1.5 bg-[#22c527] rounded-full"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 665
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 410
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: onPrev,
                                                    className: "text-white hover:text-white/70 transition active:scale-90 p-2",
                                                    title: "Lagu Sebelumnya",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-skip-back-fill text-3xl md:text-4xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 870
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 747
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: onPlayPause,
                                                    className: "w-16 h-16 md:w-18 md:h-18 bg-white hover:bg-[#22c527] text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-2xl shadow-white/20",
                                                    title: isPlaying ? "Jeda" : "Putar",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: `${isPlaying ? "ri-pause-fill" : "ri-play-fill"} text-3xl md:text-4xl ml-0.5`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 1195
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 935
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: onNext,
                                                    className: "text-white hover:text-white/70 transition active:scale-90 p-2",
                                                    title: "Lagu Berikutnya",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-skip-forward-fill text-3xl md:text-4xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 1422
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 1299
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: onToggleRepeat,
                                                    className: `transition active:scale-90 p-2 ${repeatMode !== "off" ? "text-[#22c527]" : "text-white/40 hover:text-white"}`,
                                                    title: `Mode Ulang: ${repeatMode}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: `${repeatMode === "one" ? "ri-repeat-one-line" : "ri-repeat-2-line"} text-2xl`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 1682
                                                        }, this),
                                                        repeatMode !== "off" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mx-auto mt-0.5 w-1.5 h-1.5 bg-[#22c527] rounded-full"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 1803
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 1490
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                            lineNumber: 318,
                                            columnNumber: 349
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden lg:flex items-center gap-3 px-8 group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    onClick: {
                                                        "FullPlayer[<i>.onClick]": ()=>onVolumeChange(volume === 0 ? 1 : 0)
                                                    }["FullPlayer[<i>.onClick]"],
                                                    className: `cursor-pointer text-white/50 hover:text-white transition ri-${volume === 0 ? "volume-mute-fill" : volume < 0.5 ? "volume-down-fill" : "volume-up-fill"} text-lg`,
                                                    title: "Mute / Unmute"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 1953
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden relative group/vol",
                                                    onClick: handleVolumeClick,
                                                    title: "Atur Volume",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-full bg-white/60 group-hover/vol:bg-[#22c527] transition-colors rounded-full",
                                                        style: {
                                                            width: `${volume * 100}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 398
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 245
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] font-mono text-white/40 w-8 text-right",
                                                    children: [
                                                        Math.round(volume * 100),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 30
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                            lineNumber: 318,
                                            columnNumber: 1891
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                    lineNumber: 316,
                                    columnNumber: 753
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-none w-full lg:w-115 h-65 lg:h-140 flex flex-col bg-white/3 border border-white/8 rounded-3xl overflow-hidden backdrop-blur-xl",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between p-3 border-b border-white/5 bg-black/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: {
                                                                "FullPlayer[<button>.onClick]": ()=>setActiveRightTab("lyrics")
                                                            }["FullPlayer[<button>.onClick]"],
                                                            className: `px-4 py-1.5 rounded-full text-xs font-bold transition ${activeRightTab === "lyrics" ? "bg-[#22c527] text-black" : "text-white/60 hover:text-white"}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "ri-mic-line mr-1.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                                    lineNumber: 324,
                                                                    columnNumber: 216
                                                                }, this),
                                                                " Lyrics"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 322,
                                                            columnNumber: 426
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: {
                                                                "FullPlayer[<button>.onClick]": ()=>setActiveRightTab("queue")
                                                            }["FullPlayer[<button>.onClick]"],
                                                            className: `px-4 py-1.5 rounded-full text-xs font-bold transition ${activeRightTab === "queue" ? "bg-[#22c527] text-black" : "text-white/60 hover:text-white"}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "ri-play-list-2-line mr-1.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                                    lineNumber: 326,
                                                                    columnNumber: 215
                                                                }, this),
                                                                " Up Next (",
                                                                playlist.length,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 268
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 385
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] text-white/40 font-mono hidden sm:inline-block",
                                                    children: activeRightTab === "lyrics" ? lyrics.length > 0 ? "Auto-sync" : "Instrumental" : "Click to play"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 302
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                            lineNumber: 322,
                                            columnNumber: 294
                                        }, this),
                                        activeRightTab === "lyrics" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: lyricsContainerRef,
                                            className: "w-full flex-1 overflow-y-auto scrollbar-hide px-6 py-6 mask-gradient-vertical",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-12 lg:h-40"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 642
                                                }, this),
                                                lyrics.length > 0 ? lyrics.map({
                                                    "FullPlayer[lyrics.map()]": (line, i_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                                            ref: {
                                                                "FullPlayer[lyrics.map() > <motion.p>.ref]": (el)=>{
                                                                    lyricRefs.current[i_0] = el;
                                                                }
                                                            }["FullPlayer[lyrics.map() > <motion.p>.ref]"],
                                                            animate: {
                                                                opacity: i_0 === activeLyricIndex ? 1 : 0.35,
                                                                scale: i_0 === activeLyricIndex ? 1.05 : 1
                                                            },
                                                            className: `py-2 lg:py-3 transition-all duration-300 cursor-pointer text-center lg:text-left font-bold tracking-wide leading-relaxed ${i_0 === activeLyricIndex ? "text-lg md:text-2xl text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]" : "text-sm md:text-lg text-white/80 hover:text-white"}`,
                                                            onClick: {
                                                                "FullPlayer[lyrics.map() > <motion.p>.onClick]": ()=>onSeek(line.time)
                                                            }["FullPlayer[lyrics.map() > <motion.p>.onClick]"],
                                                            title: "Klik untuk lompat ke lirik ini",
                                                            children: line.content
                                                        }, i_0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 62
                                                        }, this)
                                                }["FullPlayer[lyrics.map()]"]) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-center justify-center h-48 opacity-50 text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-music-2-line text-4xl mb-2 text-white/60"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 337,
                                                            columnNumber: 137
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-bold",
                                                            children: "Lirik Belum Tersedia / Instrumental"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 337,
                                                            columnNumber: 198
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-white/40 mt-1",
                                                            children: "Nikmati irama musiknya"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                                            lineNumber: 337,
                                                            columnNumber: 270
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 50
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-20 lg:h-50"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 345
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                            lineNumber: 326,
                                            columnNumber: 522
                                        }, this),
                                        activeRightTab === "queue" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full flex-1 overflow-y-auto scrollbar-hide p-3 space-y-2",
                                            children: playlist.map({
                                                "FullPlayer[playlist.map()]": (item, idx_0)=>{
                                                    const isCurrent = item.id === currentSong.id;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        onClick: {
                                                            "FullPlayer[playlist.map() > <div>.onClick]": ()=>onSelectSong && onSelectSong(item)
                                                        }["FullPlayer[playlist.map() > <div>.onClick]"],
                                                        className: `flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition ${isCurrent ? "bg-[#22c527]/15 border border-[#22c527]/40 text-white" : "hover:bg-white/5 border border-transparent text-white/80"}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-5 text-center text-xs font-mono text-white/40",
                                                                children: idx_0 + 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/FullPlayer.tsx",
                                                                lineNumber: 342,
                                                                columnNumber: 284
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: item.cover,
                                                                alt: item.title,
                                                                className: "w-10 h-10 rounded-xl object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/FullPlayer.tsx",
                                                                lineNumber: 342,
                                                                columnNumber: 368
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                        className: `text-xs font-bold truncate ${isCurrent ? "text-[#22c527]" : "text-white"}`,
                                                                        children: item.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                                        lineNumber: 342,
                                                                        columnNumber: 487
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[11px] text-white/50 truncate",
                                                                        children: item.artist
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                                        lineNumber: 342,
                                                                        columnNumber: 596
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/FullPlayer.tsx",
                                                                lineNumber: 342,
                                                                columnNumber: 455
                                                            }, this),
                                                            isCurrent && isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-0.5 px-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-1 bg-[#22c527] rounded-full animate-music-bar-1 h-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                                        lineNumber: 342,
                                                                        columnNumber: 744
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-1 bg-[#22c527] rounded-full animate-music-bar-2 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                                        lineNumber: 342,
                                                                        columnNumber: 818
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-1 bg-[#22c527] rounded-full animate-music-bar-3 h-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                                        lineNumber: 342,
                                                                        columnNumber: 892
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/FullPlayer.tsx",
                                                                lineNumber: 342,
                                                                columnNumber: 696
                                                            }, this)
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/src/components/FullPlayer.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 28
                                                    }, this);
                                                }
                                            }["FullPlayer[playlist.map()]"])
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/FullPlayer.tsx",
                                            lineNumber: 337,
                                            columnNumber: 415
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/FullPlayer.tsx",
                                    lineNumber: 322,
                                    columnNumber: 145
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/FullPlayer.tsx",
                            lineNumber: 316,
                            columnNumber: 586
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/FullPlayer.tsx",
                        lineNumber: 316,
                        columnNumber: 490
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/FullPlayer.tsx",
                    lineNumber: 316,
                    columnNumber: 383
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FullPlayer.tsx",
            lineNumber: 289,
            columnNumber: 21
        }, this);
        $[24] = activeLyricIndex;
        $[25] = activeRightTab;
        $[26] = currentSong;
        $[27] = duration;
        $[28] = handleDragEnd;
        $[29] = handleProgressBarClick;
        $[30] = handleVolumeClick;
        $[31] = isDesktop;
        $[32] = isLiked;
        $[33] = isOpen;
        $[34] = isPlaying;
        $[35] = isShuffle;
        $[36] = lyrics;
        $[37] = onClose;
        $[38] = onNext;
        $[39] = onPlayPause;
        $[40] = onPlaybackRateChange;
        $[41] = onPrev;
        $[42] = onSeek;
        $[43] = onSelectSong;
        $[44] = onToggleLike;
        $[45] = onToggleRepeat;
        $[46] = onToggleShuffle;
        $[47] = onVolumeChange;
        $[48] = playbackRate;
        $[49] = playlist;
        $[50] = progress;
        $[51] = progressPercent;
        $[52] = repeatMode;
        $[53] = showSpeedMenu;
        $[54] = volume;
        $[55] = t17;
    } else {
        t17 = $[55];
    }
    let t18;
    if ($[56] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t17
        }, void 0, false, {
            fileName: "[project]/src/components/FullPlayer.tsx",
            lineNumber: 382,
            columnNumber: 11
        }, this);
        $[56] = t17;
        $[57] = t18;
    } else {
        t18 = $[57];
    }
    return t18;
}
_s(FullPlayer, "hy8REm2wpioD9QdMGWgX4TQCVpI=");
_c = FullPlayer;
function _FullPlayerButtonOnClickSetShowSpeedMenu(p) {
    return !p;
}
function _FullPlayerUseEffectAnonymous(res) {
    return res.text();
}
var _c;
__turbopack_context__.k.register(_c, "FullPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
;
;
function Toast(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "945b04ff65d6c0c329f3fdd94fc4b12c49e23863c495dc9128c32712c165bfac") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "945b04ff65d6c0c329f3fdd94fc4b12c49e23863c495dc9128c32712c165bfac";
    }
    const { message, isVisible } = t0;
    let t1;
    if ($[1] !== isVisible || $[2] !== message) {
        t1 = isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: 50,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                y: 0,
                scale: 1
            },
            exit: {
                opacity: 0,
                y: 20,
                scale: 0.9
            },
            className: "fixed bottom-24 left-1/2 -translate-x-1/2 z-150 bg-[#22c527] text-black px-6 py-3 rounded-full shadow-2xl flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "ri-checkbox-circle-fill text-xl"
                }, void 0, false, {
                    fileName: "[project]/src/components/Toast.tsx",
                    lineNumber: 34,
                    columnNumber: 150
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-bold text-sm",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/src/components/Toast.tsx",
                    lineNumber: 34,
                    columnNumber: 199
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Toast.tsx",
            lineNumber: 22,
            columnNumber: 23
        }, this);
        $[1] = isVisible;
        $[2] = message;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t1
        }, void 0, false, {
            fileName: "[project]/src/components/Toast.tsx",
            lineNumber: 43,
            columnNumber: 10
        }, this);
        $[4] = t1;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    return t2;
}
_c = Toast;
var _c;
__turbopack_context__.k.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SkeletonLoader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SkeletonLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function SkeletonLoader() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "1f551ca5412198b63f405571ae128306de168c7f7cb1499e313911cb794e7afa") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1f551ca5412198b63f405571ae128306de168c7f7cb1499e313911cb794e7afa";
    }
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2 hidden md:block w-1/4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-3 w-24 bg-white/10 rounded-full"
                }, void 0, false, {
                    fileName: "[project]/src/components/SkeletonLoader.tsx",
                    lineNumber: 14,
                    columnNumber: 59
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-7 w-36 bg-white/15 rounded-lg"
                }, void 0, false, {
                    fileName: "[project]/src/components/SkeletonLoader.tsx",
                    lineNumber: 14,
                    columnNumber: 112
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SkeletonLoader.tsx",
            lineNumber: 14,
            columnNumber: 10
        }, this);
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-12 w-full max-w-lg bg-white/10 rounded-full"
        }, void 0, false, {
            fileName: "[project]/src/components/SkeletonLoader.tsx",
            lineNumber: 15,
            columnNumber: 10
        }, this);
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-4 mb-8",
            children: [
                t0,
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-end gap-3 w-1/4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 rounded-full bg-white/10"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SkeletonLoader.tsx",
                            lineNumber: 24,
                            columnNumber: 139
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 rounded-full bg-white/10"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SkeletonLoader.tsx",
                            lineNumber: 24,
                            columnNumber: 193
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SkeletonLoader.tsx",
                    lineNumber: 24,
                    columnNumber: 80
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SkeletonLoader.tsx",
            lineNumber: 24,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-linear-to-r from-white/0 via-white/5 to-white/0 -translate-x-full animate-[shimmer_2s_infinite]"
        }, void 0, false, {
            fileName: "[project]/src/components/SkeletonLoader.tsx",
            lineNumber: 31,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-65 md:h-75 rounded-3xl bg-white/5 border border-white/5 mb-8 relative overflow-hidden",
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-8 md:p-12 flex flex-col justify-center h-full max-w-lg space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-5 w-24 bg-white/10 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SkeletonLoader.tsx",
                            lineNumber: 38,
                            columnNumber: 210
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 md:h-10 w-3/4 bg-white/15 rounded-lg"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SkeletonLoader.tsx",
                            lineNumber: 38,
                            columnNumber: 263
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-4 w-1/2 bg-white/10 rounded-lg"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SkeletonLoader.tsx",
                            lineNumber: 38,
                            columnNumber: 323
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-10 w-32 bg-white/15 rounded-full mt-2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SkeletonLoader.tsx",
                            lineNumber: 38,
                            columnNumber: 375
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SkeletonLoader.tsx",
                    lineNumber: 38,
                    columnNumber: 126
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SkeletonLoader.tsx",
            lineNumber: 38,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-4 mb-6",
            children: [
                1,
                2,
                3,
                4,
                5
            ].map(_SkeletonLoaderAnonymous)
        }, void 0, false, {
            fileName: "[project]/src/components/SkeletonLoader.tsx",
            lineNumber: 45,
            columnNumber: 10
        }, this);
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen w-full bg-[#09090b] flex flex-col p-6 max-w-7xl mx-auto animate-pulse",
            children: [
                t2,
                t4,
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4",
                    children: [
                        ...Array(10)
                    ].map(_SkeletonLoaderAnonymous2)
                }, void 0, false, {
                    fileName: "[project]/src/components/SkeletonLoader.tsx",
                    lineNumber: 52,
                    columnNumber: 122
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SkeletonLoader.tsx",
            lineNumber: 52,
            columnNumber: 10
        }, this);
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    return t6;
}
_c = SkeletonLoader;
function _SkeletonLoaderAnonymous2(_, i_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3 p-3 rounded-2xl bg-white/5 border border-white/5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aspect-square w-full rounded-xl bg-white/10"
            }, void 0, false, {
                fileName: "[project]/src/components/SkeletonLoader.tsx",
                lineNumber: 60,
                columnNumber: 106
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-4 w-3/4 bg-white/10 rounded"
            }, void 0, false, {
                fileName: "[project]/src/components/SkeletonLoader.tsx",
                lineNumber: 60,
                columnNumber: 169
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-3 w-1/2 bg-white/5 rounded"
            }, void 0, false, {
                fileName: "[project]/src/components/SkeletonLoader.tsx",
                lineNumber: 60,
                columnNumber: 218
            }, this)
        ]
    }, i_0, true, {
        fileName: "[project]/src/components/SkeletonLoader.tsx",
        lineNumber: 60,
        columnNumber: 10
    }, this);
}
function _SkeletonLoaderAnonymous(i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-8 w-24 bg-white/10 rounded-full"
    }, i, false, {
        fileName: "[project]/src/components/SkeletonLoader.tsx",
        lineNumber: 63,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "SkeletonLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAudioPlayer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAudioPlayer.ts [app-client] (ecmascript)");
// KOMPONEN UI
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HeroCarousel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TabSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TabSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SongList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SongList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MiniPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MiniPlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FullPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FullPlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SkeletonLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SkeletonLoader.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    _s();
    // --- STATE ---
    const [songs, setSongs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isPlayerOpen, setIsPlayerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Songs");
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("default");
    const [toastMsg, setToastMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showToast, setShowToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Hook Player
    const player = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAudioPlayer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudioPlayer"])(songs);
    // --- 1. FETCH DATA DARI API ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            let isMounted = true;
            const fetchSongs = {
                "Home.useEffect.fetchSongs": async ()=>{
                    try {
                        const response = await fetch("/api/songs");
                        const data = await response.json();
                        if (isMounted) {
                            setSongs(data);
                            player.setPlaylist(data);
                            setIsLoading(false);
                        }
                    } catch (error) {
                        console.error("Gagal memuat lagu:", error);
                        if (isMounted) {
                            setIsLoading(false);
                        }
                    }
                }
            }["Home.useEffect.fetchSongs"];
            fetchSongs();
            return ({
                "Home.useEffect": ()=>{
                    isMounted = false;
                }
            })["Home.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Home.useEffect"], []);
    // --- 2. FILTERING & SORTING DATA ---
    const displayedSongs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[displayedSongs]": ()=>{
            const term = searchTerm.toLowerCase().trim();
            const filtered = songs.filter({
                "Home.useMemo[displayedSongs].filtered": (song)=>{
                    const matchesSearch = !term || song.title.toLowerCase().includes(term) || song.artist.toLowerCase().includes(term) || song.genre && song.genre.toLowerCase().includes(term);
                    let matchesTab = true;
                    if (activeTab === "Favorites") {
                        matchesTab = player.likedSongs.includes(song.id);
                    } else if (activeTab !== "All Songs") {
                        matchesTab = song.genre?.toLowerCase() === activeTab.toLowerCase() || song.genre?.toLowerCase().includes(activeTab.toLowerCase().split("/")[0].trim()) || false;
                    }
                    return matchesSearch && matchesTab;
                }
            }["Home.useMemo[displayedSongs].filtered"]);
            if (sortBy === "title") {
                return [
                    ...filtered
                ].sort({
                    "Home.useMemo[displayedSongs]": (a, b)=>a.title.localeCompare(b.title)
                }["Home.useMemo[displayedSongs]"]);
            }
            if (sortBy === "artist") {
                return [
                    ...filtered
                ].sort({
                    "Home.useMemo[displayedSongs]": (a, b)=>a.artist.localeCompare(b.artist)
                }["Home.useMemo[displayedSongs]"]);
            }
            return filtered;
        }
    }["Home.useMemo[displayedSongs]"], [
        songs,
        searchTerm,
        activeTab,
        sortBy,
        player.likedSongs
    ]);
    // Sync playlist aktif ke hook player
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (!isLoading && displayedSongs.length > 0) {
                player.setPlaylist(displayedSongs);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Home.useEffect"], [
        displayedSongs,
        isLoading
    ]);
    // --- TOAST HELPER ---
    const triggerToast = (msg)=>{
        setToastMsg(msg);
        setShowToast(true);
        setTimeout(()=>setShowToast(false), 2200);
    };
    const handleToggleLikeCurrent = ()=>{
        if (player.currentSong) {
            const isLiked = player.likedSongs.includes(player.currentSong.id);
            player.toggleLike(player.currentSong.id);
            triggerToast(isLiked ? "Dihapus dari Favorit" : "Ditambahkan ke Favorit ❤️");
        }
    };
    const handleToggleLikeSong = (song)=>{
        const isLiked = player.likedSongs.includes(song.id);
        player.toggleLike(song.id);
        triggerToast(isLiked ? `"${song.title}" dihapus dari Favorit` : `"${song.title}" disimpan ke Favorit ❤️`);
    };
    // --- LOADING SCREEN DENGAN SKELETON LOADER MEWAH ---
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SkeletonLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 108,
            columnNumber: 12
        }, this);
    }
    // --- RENDER UTAMA ---
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative min-h-screen w-full flex flex-col bg-[#09090b] text-white selection:bg-[#22c527] selection:text-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aurora-bg"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                searchTerm: searchTerm,
                setSearchTerm: setSearchTerm,
                totalSongsCount: songs.length
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: toastMsg,
                isVisible: showToast
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto scrollbar-hide pb-36 px-4 md:px-8 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        !searchTerm && activeTab === "All Songs" && songs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroCarousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            songs: songs,
                            currentSong: player.currentSong,
                            isPlaying: player.isPlaying,
                            onPlay: player.playSong,
                            onTogglePlay: player.togglePlay
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 122,
                            columnNumber: 76
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TabSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            activeTab: activeTab,
                            setActiveTab: setActiveTab,
                            sortBy: sortBy,
                            setSortBy: setSortBy,
                            favoritesCount: player.likedSongs.length
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        activeTab === "Favorites" && displayedSongs.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-20 bg-white/2 rounded-3xl border border-white/5 my-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#22c527]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "ri-heart-line text-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-white mb-1",
                                    children: "Belum Ada Lagu Favorit"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/40 text-xs max-w-sm mx-auto mb-4",
                                    children: "Tekan tombol hati pada kartu lagu atau player untuk menambahkan lagu ke koleksi favoritmu."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("All Songs"),
                                    className: "px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition",
                                    children: "Jelajahi Semua Lagu"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 128,
                            columnNumber: 72
                        }, this),
                        searchTerm && displayedSongs.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-20 bg-white/2 rounded-3xl border border-white/5 my-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-white/40",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "ri-search-line text-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-white mb-1",
                                    children: "Lagu Tidak Ditemukan"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/40 text-xs max-w-sm mx-auto mb-4",
                                    children: [
                                        "Tidak ada hasil untuk pencarian “",
                                        searchTerm,
                                        "”. Coba kata kunci lain atau periksa ejaan."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSearchTerm(""),
                                    className: "px-4 py-2 rounded-full bg-[#22c527] text-black text-xs font-bold transition hover:scale-105",
                                    children: "Hapus Pencarian"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 154,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 144,
                            columnNumber: 57
                        }, this),
                        displayedSongs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SongList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            songs: displayedSongs,
                            currentSong: player.currentSong,
                            isPlaying: player.isPlaying,
                            likedSongs: player.likedSongs,
                            onPlay: player.playSong,
                            onToggleLike: handleToggleLikeSong
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 160,
                            columnNumber: 41
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MiniPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                currentSong: player.currentSong,
                isPlaying: player.isPlaying,
                progress: player.progress,
                duration: player.duration,
                volume: player.volume,
                isLiked: player.currentSong ? player.likedSongs.includes(player.currentSong.id) : false,
                onPlayPause: player.togglePlay,
                onNext: player.handleNext,
                onPrev: player.handlePrev,
                onSeek: player.handleSeek,
                onVolumeChange: player.handleVolumeChange,
                onToggleLike: handleToggleLikeCurrent,
                onExpand: ()=>setIsPlayerOpen(true),
                onOpenQueue: ()=>setIsPlayerOpen(true)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FullPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isPlayerOpen,
                onClose: ()=>setIsPlayerOpen(false),
                currentSong: player.currentSong,
                isPlaying: player.isPlaying,
                onPlayPause: player.togglePlay,
                onNext: player.handleNext,
                onPrev: player.handlePrev,
                progress: player.progress,
                duration: player.duration,
                onSeek: player.handleSeek,
                volume: player.volume,
                onVolumeChange: player.handleVolumeChange,
                isLiked: player.currentSong ? player.likedSongs.includes(player.currentSong.id) : false,
                onToggleLike: handleToggleLikeCurrent,
                isShuffle: player.isShuffle,
                repeatMode: player.repeatMode,
                onToggleShuffle: player.toggleShuffle,
                onToggleRepeat: player.toggleRepeat,
                playlist: displayedSongs,
                onSelectSong: player.playSong,
                playbackRate: player.playbackRate,
                onPlaybackRateChange: player.setPlaybackRate
            }, player.currentSong?.id || "empty", false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 112,
        columnNumber: 10
    }, this);
}
_s(Home, "fycXsQ4QpQAzXMXvFgAgy88cuAw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAudioPlayer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudioPlayer"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_7a3b5213._.js.map