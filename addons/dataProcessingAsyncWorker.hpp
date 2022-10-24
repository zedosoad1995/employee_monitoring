#include <napi.h>

using namespace Napi;

class DataProcessingAsyncWorker : public AsyncWorker
{
    public:
        DataProcessingAsyncWorker(Function &callback);

        void Execute();

        void OnOK();
};