import { useEffect } from "react";

const ChatbotEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.async = true;
    script.id = "ZjJwJlD2MkB4sHcv_6nwf";
    script.setAttribute("domain", "www.chatbase.co");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function(){
            if(!window.chatbase || window.chatbase("getState") !== "initialized") {
              window.chatbase = (...arguments) => {
                if(!window.chatbase.q){window.chatbase.q=[]}
                window.chatbase.q.push(arguments)
              };
              window.chatbase = new Proxy(window.chatbase, {
                get(target, prop){
                  if(prop==="q"){return target.q}
                  return (...args) => target(prop, ...args)
                }
              });
            }
          })();
        `,
      }}
    />
  );
};

export default ChatbotEmbed;
