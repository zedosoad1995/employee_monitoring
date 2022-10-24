#include <napi.h>

#include "DataProcessingAsyncWorker.hpp"

using namespace Napi;

void ProcessData(const CallbackInfo& info) {
    Function cb = info[0].As<Function>();

    DataProcessingAsyncWorker *worker = new DataProcessingAsyncWorker(cb);
    worker->Queue();
}

Object Init(Env env, Object exports) {
    exports.Set(String::New(env, "processData"),
                Function::New(env, ProcessData));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)