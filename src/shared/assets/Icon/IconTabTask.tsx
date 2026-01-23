type IconTabTaskType = {
    isTasksActive: boolean;
}
export const IconTabTask = ({isTasksActive}: IconTabTaskType) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.05 8.70041L17.2333 12.1837C16.5333 15.1921 15.15 16.4087 12.55 16.1587C12.1333 16.1254 11.6833 16.0504 11.2 15.9337L9.79999 15.6004C6.32499 14.7754 5.24999 13.0587 6.06665 9.57541L6.88332 6.08375C7.04999 5.37541 7.24999 4.75875 7.49999 4.25041C8.47499 2.23375 10.1333 1.69208 12.9167 2.35041L14.3083 2.67541C17.8 3.49208 18.8667 5.21708 18.05 8.70041Z"
                  stroke={isTasksActive ? "white" : "#5B5B5B"}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.55 16.1583C12.0334 16.5083 11.3834 16.8 10.5917 17.0583L9.27504 17.4917C5.96671 18.5583 4.22504 17.6667 3.15004 14.3583L2.08337 11.0667C1.01671 7.75833 1.90004 6.00833 5.20837 4.94167L6.52504 4.50833C6.86671 4.4 7.19171 4.30833 7.50004 4.25C7.25004 4.75833 7.05004 5.375 6.88337 6.08333L6.06671 9.575C5.25004 13.0583 6.32504 14.775 9.80004 15.6L11.2 15.9333C11.6834 16.05 12.1334 16.125 12.55 16.1583Z"
                  stroke={isTasksActive ? "white" : "#5B5B5B"}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.5334 7.1084L14.5751 8.1334"
                  stroke={isTasksActive ? "white" : "#5B5B5B"}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.71655 10.333L12.1332 10.9497"
                  stroke={isTasksActive ? "white" : "#5B5B5B"}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}