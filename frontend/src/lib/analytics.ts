export type AnalyticsEvent =
  | 'page_view'
  | 'exam_selected'
  | 'pyq_started'
  | 'pyq_completed'
  | 'mock_started'
  | 'mock_completed'
  | 'mock_cancelled'
  | 'question_answered'
  | 'result_viewed'
  | 'signup_completed'
  | 'login_completed';

export function trackEvent(eventName: AnalyticsEvent, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    // Internal event logging & Google Analytics dataLayer bridge
    console.log(`[EVENT ANALYTICS]: ${eventName}`, properties || {});

    if ((window as unknown as { dataLayer?: Array<unknown> }).dataLayer) {
      (window as unknown as { dataLayer: Array<unknown> }).dataLayer.push({
        event: eventName,
        ...properties,
      });
    }
  }
}
