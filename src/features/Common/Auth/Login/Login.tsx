import { IAxiosError } from "@encacap-group/common/dist/base";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLayoutEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Alert from "@components/Alert/Alert";
import { Button, Input } from "@components/Form";
import { Logo } from "@components/Logo";
import { AuthErrorEnum } from "@constants/errors";
import { ADMIN_PATH } from "@constants/urls";
import useDispatch from "@hooks/useDispatch";
import { FormGenericErrorType } from "@interfaces/Common/commonTypes";
import { authService } from "@services/index";
import { setUser } from "@slices/commonSlice";
import { setDocumentTitle } from "@utils/helpers";

import { authLoginFormSchema } from "../Schemas/authLoginFormSchema";

const Login = () => {
  const { t } = useTranslation("common", {
    keyPrefix: "page.auth.page.login",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [genericError, setGenericError] = useState<FormGenericErrorType | null>(null);

  const { control, handleSubmit: useFormSubmit } = useForm<FieldValues>({
    resolver: yupResolver(authLoginFormSchema(t)),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = useFormSubmit((data) => {
    setIsSubmitting(true);
    authService
      .loginWithEmailAndPassword(data.email, data.password)
      .then(({ authTokens, user }) => {
        dispatch(setUser(user));
        authService.setAuthTokens(authTokens.accessToken, authTokens.refreshToken);
        navigate(ADMIN_PATH.HOME_PATH);
      })
      .catch((error: IAxiosError) => {
        const { response } = error;

        setIsSubmitting(false);

        if (!response) {
          setGenericError({
            code: AuthErrorEnum.UNKNOWN_ERROR,
            message: t("errors.unknown"),
          });
          return;
        }

        setGenericError({
          code: AuthErrorEnum.UNAUTHORIZED,
          message: t("errors.invalidCredentials"),
          trackingCode: response.data.code,
        });
      });
  });

  useLayoutEffect(() => {
    setDocumentTitle(t("title"));
  });

  return (
    <div className="flex min-h-screen py-10">
      <div className="m-auto h-fit w-120 rounded-xl border-2 border-gray-100 px-14 py-16">
        <div className="flex flex-col items-center justify-center">
          <Logo className="w-16" />
          <div className="mt-10 text-center">
            <div className="text-2xl font-semibold">{t("welcomeBack")}</div>
            <div className="mt-2 text-sm text-gray-500">{t("loginToContinue")}</div>
          </div>
        </div>
        <form className="mt-12 grid gap-6" onSubmit={handleSubmit}>
          {genericError && (
            <Alert
              type="error"
              title={t("errors.title")}
              message={genericError?.message}
              trackingCode={genericError.trackingCode}
            />
          )}
          <Input
            name="email"
            className="block"
            placeholder={t("form.email.placeholder") ?? ""}
            control={control}
            disabled={isSubmitting}
          />
          <Input
            type="password"
            name="password"
            className="block"
            placeholder={t("form.password.placeholder") ?? ""}
            control={control}
            disabled={isSubmitting}
          />
          <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
            {t("form.submit")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
