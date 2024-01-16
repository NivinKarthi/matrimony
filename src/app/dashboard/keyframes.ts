import { keyframes, style,animate } from '@angular/animations';

export const right = [
  style({ opacity: 1 }),
  style({ transform: 'translate3d(200%, 0, 0) rotate3d(0, 0, 1, 120deg)', opacity: 0 }),
]

export const left = [
  style({ opacity: 1 }),
  style({ transform: 'translate3d(-200%, 0, 0) rotate3d(0, 0, 1, -120deg)', opacity: 0 }),
]


