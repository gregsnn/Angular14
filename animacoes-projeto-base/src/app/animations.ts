import {animate, state, style, transition, trigger} from "@angular/animations";

export const highlightedStateTrigger = trigger('highlightedState', [
  state('default', style({
    border: '2px solid #b2b6ff',
  })),
  state('highlighted', style({
    border: '4px solid #b2b6ff',
    filter: 'brightness(92%)',
  })),
  transition('default => highlighted', [
    animate('200ms ease-out', style({
      transform: 'scale(1.02)',
    })),
    animate(200),
  ]),
])

export const showStateTrigger = trigger('showState', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(300, style({
      opacity: 1,
    })),
  ]),
  transition(':leave', [
    animate(300, style({
      opacity: 0,
    }))
  ])
])

export const buttonBounceStateTrigger = trigger('buttonBounceState', [
  transition('* => bounce', [
    animate('400ms ease-out', style({
      transform: 'scale(0.4)',
    })),
  ]),
])
