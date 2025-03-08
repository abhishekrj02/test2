import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router";
import { problems } from "@/lib/data";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import Editor from "@monaco-editor/react";
import axios from "axios";

const ProblemDetails = ({
  heading,
  difficulty,
  category,
  description,
  Requirements

}) => {


  return (
    <div className="space-y-4 pr-4">


      <h1 className="text-2xl font-bold mr-4">{heading}</h1>
      <div className="flex space-x-2">
        <span className="px-2 py-1 text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
          {difficulty}
        </span>
        <span className="px-2 py-1 text-sm font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
          {category}
        </span>
      </div>
      <p className="text-gray-400 dark:text-gray-300 ">{description}</p>
      <h2 className="text-lg">Requirements:</h2>
      <pre className="text-gray-400 dark:text-gray-300 whitespace-pre-wrap break-words">
        {Requirements}
      </pre>

    </div>
  );
};

const DummyContent = () => (
  <div className="h-[90vh] bg-[#1e1e1e] rounded-xl border border-[#3f3f46] ml-2 overflow-hidden">
    <Outlet />
  </div>
);



const EditorPage = ({ lang, id, code, setCode }) => {
  useEffect(() => {
    const problem = problems.find((p) => p.id == id); // Find the correct problem by ID
    if (problem) {
      setCode(problem.codeTemplate); // Set the default code
    }
  }, [id, setCode]); // Runs when `id` changes
  
  const blockchainLanguages = { "sol": "Solidity (Ethereum)", "move": "Move (Aptos, Sui)" };

  useEffect(() => {
    Init();
  }, []);

  const Init = () => {
    if (window.monaco) {
      // --------- MOVE LANGUAGE SUPPORT ---------
      window.monaco.languages.register({ id: "move" });

      window.monaco.languages.setMonarchTokensProvider("move", {
        keywords: [
          "module", "struct", "public", "fun", "entry", "script", "let", "mut",
          "address", "use", "move", "copy", "store", "has", "borrow_global",
          "borrow_global_mut", "signer", "assert", "true", "false", "u8", "u64",
          "u128", "vector", "return"
        ],
        tokenizer: {
          root: [
            [/[a-zA-Z_][\w$]*/, { cases: { "@keywords": "keyword", "@default": "identifier" } }],
            [/[{}()\[\]]/, "delimiter"],
            [/[0-9]+/, "number"],
            [/".*?"/, "string"],
            [/\/\/.*/, "comment"],
            [/\/\*/, "comment", "@comment"]
          ],
          comment: [
            [/\*\//, "comment", "@pop"],
            [/./, "comment"]
          ]
        }
      });

      window.monaco.languages.registerCompletionItemProvider("move", {
        provideCompletionItems: () => ({
          suggestions: [
            { label: "module", kind: window.monaco.languages.CompletionItemKind.Keyword, insertText: "module <name>::<ModuleName> { }" },
            { label: "public fun", kind: window.monaco.languages.CompletionItemKind.Keyword, insertText: "public fun <name>() { }" },
            { label: "struct", kind: window.monaco.languages.CompletionItemKind.Keyword, insertText: "struct <StructName> has key, store { field: u64 }" }
          ]
        })
      });
    }
  };

  const handleCodeChange = (value) => setCode(value);
  return (
    <div className="p-5 font-sans">
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Code Editor</h1>
        <div className="p-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >{blockchainLanguages[lang]}</div>
      </div>

      {/* Code Editor Section */}
      <div className="mb-6">
        <Editor
          height="350px"
          language={lang}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          className="border border-gray-300 rounded-md overflow-hidden"
        />
      </div>
    </div>
  );
};

const Output = ({ code, minting, setMinting }) => {
  const [output, setOutput] = useState("");

  const handleRunCode = async () => {
    setOutput("Running code...\n");

    try {
      console.log(code);
      const response = await axios.post("http://localhost:3001/run", { "code": code });
      setOutput(response.data.message);
    } catch (error) {
      setOutput(error.response.data.error + '\n' +error.response.data.details);
    }
  };

  const mainSubmit = async () => {
    setMinting(true); // Show minting overlay
    setOutput("Deploying contract...\n");

    try {
      const response = await axios.post("http://localhost:3001/deploy", { "code": code });
      console.log(response);
      setOutput("Deployment successful!\nAddress:" + response.data.address);
    } catch (error) {
      // console.error("Error during deployment:", error);
      console.log(error.response.data);
      setOutput("Error during deployment.");
    } finally {
      setMinting(false); // Hide minting overlay
    }
  };

  return (
    <div className="p-5 font-sans">
      {minting && (
        <div className="w-full h-screen bg-black/70 fixed top-0 left-0 z-[40] flex justify-center items-center flex-col gap-2">
          <TextShimmerWave className="font-mono text-2xl mt-4 font-bold" duration={1}>
            Minting Your NFT's
          </TextShimmerWave>
        </div>
      )}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Output Area</h2>
        <pre className="bg-zinc-800 border p-4 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap break-wordso">
          {output}
        </pre>
      </div>
      <div className="flex flex-row-reverse">
        <button
          className="rounded-full bg-[#18DF16] font-bold px-4 py-2 mx-2 hover:opacity-75 transition duration-300"
          onClick={mainSubmit}
        >
          Deploy
        </button>
        <button
          onClick={handleRunCode}
          className="rounded-full bg-[#167edf] font-bold px-4 py-2 mx-2 hover:opacity-75 transition duration-300"
        >
          Compile
        </button>
      </div>
    </div>
  );
};


export default function ProblemLayout() {
  const { id, lang } = useParams();
  const problemToBeShown = problems.find((problem) => problem.id == id);
  const { title, description, category, difficulty, Requirements } = problemToBeShown;
  const [code ,setCode] = useState("");
  const [minting, setMinting] = useState(false); // Add state to control minting overlay

  return (
    // <div className="h-[100vh] bg-black text-white p-4 m-0 pt-0 ">
      <div className="min-h-screen bg-black text-white p-4 m-0 pt-0 overflow-auto">

      <ResizablePanelGroup direction="horizontal" className="min-h-screen ">
        {/* Left Panel: Problem Details */}
        <ResizablePanel defaultSize={30} minSize={20} className="box-border overflow-auto ">
          <div className="flex p-6 bg-[#27272A] rounded-xl border border-[#3f3f46] mr-2 h-[90vh]">
            <ProblemDetails
              heading={title}
              difficulty={difficulty}
              category={category}
              description={description}
              Requirements={Requirements}
              minting={minting}
              setMinting={setMinting}
            />
          </div>
        </ResizablePanel>

        {/* Middle Resize Handle */}
        <ResizableHandle withHandle={false} className="bg-[#27272A] h-[90vh]" />

        <ResizablePanel defaultSize={70} className="overflow-scroll">
          <ResizablePanelGroup direction="vertical">
 
            <ResizablePanel defaultSize={60} minSize={40} className="overflow-auto">
              <EditorPage lang={lang} id={id} code={code} setCode={setCode}/>
            </ResizablePanel>

            <ResizableHandle withHandle={false} className="bg-[#27272A] w-full" />

            <ResizablePanel defaultSize={40} minSize={20} className="overflow-auto">
              <Output minting={minting}
                setMinting={setMinting} code={code}/>
            </ResizablePanel>

          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>

    </div>
  );
}
