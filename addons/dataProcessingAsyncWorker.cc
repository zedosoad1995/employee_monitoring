#include "DataProcessingAsyncWorker.hpp"
#include <chrono>
#include <thread>

DataProcessingAsyncWorker::DataProcessingAsyncWorker(Function &callback) : AsyncWorker(callback)
{
}

void DataProcessingAsyncWorker::Execute()
{
    //while(true){
        std::this_thread::sleep_for(std::chrono::milliseconds(1000));
        //Callback().Call({});
    //}
}

void DataProcessingAsyncWorker::OnOK()
{
    while(true){
        std::this_thread::sleep_for(std::chrono::milliseconds(1000));
        Callback().Call({});
    }
}