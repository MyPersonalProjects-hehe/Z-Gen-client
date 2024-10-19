import { NotificationInstance } from 'antd/es/notification/interface';

interface NotificationProps {
  api: NotificationInstance;
  icon: any;
  message: string;
  description: string;
}

export const openNotification = ({
  api,
  icon,
  message,
  description,
}: NotificationProps) => {
  api.open({
    message: message,
    description: description,
    icon: icon,
  });
};
