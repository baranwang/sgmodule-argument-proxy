import type { NextPage } from "next";
import { Button, Card, Form, Input, Spin, Typography } from "antd";
import { CSSProperties, useEffect } from "react";
import { useRequest } from "ahooks";

type Data = {
  url: string;
  arg: string[];
};

const Home: NextPage = () => {
  const [form] = Form.useForm<Data>();

  const {
    data: tempArgs,
    run: getTempArgs,
    loading,
  } = useRequest<string[], string[]>(
    (url) =>
      fetch(`/api/arg?url=${encodeURIComponent(url)}`)
        .then((res) => res.json())
        .then((res) => res.data),
    { manual: true }
  );

  useEffect(() => {
    if (!tempArgs) return;
    let arg = tempArgs;
    if (arg.every((item) => item === arg[0])) {
      arg = [arg[0]];
    }
    form.setFieldsValue({ arg });
  }, [form, tempArgs]);

  return (
    <Card>
      <Form form={form} layout="vertical">
        <Form.Item name="url" label="Sgmodule">
          <Input
            type="url"
            placeholder="Sgmodule URL"
            onChange={(e) => {
              try {
                getTempArgs(new URL(e.target.value).toString());
              } catch (error) {}
            }}
          />
        </Form.Item>

        <Spin spinning={loading}>
          <Form.List name="arg">
            {(fields) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...field}
                    key={field.key}
                    label={index === 0 ? "Argument" : ""}>
                    <Input placeholder={`Argument ${index + 1}`} />
                  </Form.Item>
                ))}
              </>
            )}
          </Form.List>

          <Form.Item<Data> shouldUpdate noStyle>
            {({ getFieldsValue }) => {
              if (!process.browser) return <></>;
              const { url, arg } = getFieldsValue();
              if (!url) return <></>;
              const result = new URL("/api/temp", window.location.origin);
              result.searchParams.set("url", url);
              arg?.forEach((item) => result.searchParams.append("arg", item));
              return (
                <Form.Item label="Result URL">
                  <Input.TextArea
                    value={result.toString()}
                    autoSize={{ minRows: 3 }}
                  />
                  <Typography.Text
                    copyable={(() => {
                      const style: CSSProperties = {
                        marginTop: "8px",
                        marginBottom: "8px",
                        marginLeft: "-4px",
                      };
                      return {
                        text: result.toString(),
                        tooltips: "",
                        icon: [
                          <Button key={1} style={style}>
                            Copy URL
                          </Button>,
                          <Button key={2} style={style}>
                            Success
                          </Button>,
                        ],
                      };
                    })()}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
        </Spin>
      </Form>
    </Card>
  );
};

export default Home;
