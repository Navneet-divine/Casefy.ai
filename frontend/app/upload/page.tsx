"use client";

import { FileUpload } from "@/components/FileUpload";
import { CaseForm } from "@/components/CaseForm";

export default function UploadPage() {
  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Upload Case Files
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Add PDF documents to your cases for analysis
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
            Don&apos;t have a case yet?
          </h2>
          <CaseForm />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
            Upload Files
          </h2>
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
