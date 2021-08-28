/// <reference types="react-scripts" />
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.mp4';
declare module '*.webm';
declare module '*.mp4' {
  const src: string;
  export default src;
}
