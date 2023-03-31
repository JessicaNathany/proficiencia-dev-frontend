export interface AuthEnabledComponentConfig {
  isPublic: boolean;
}

export type ComponentWithAuth<PropsType = any> = React.FC<PropsType> &
  AuthEnabledComponentConfig;
